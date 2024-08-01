import json
import os
import time
import uuid
from dotenv import load_dotenv
from timestamp_search.playlist_utils import youtube_transcript_loader
from timestamp_search.playlist_utils import get_video_urls_from_playlist, get_video_title, get_video_id
from timestamp_search.stopwards_removal import remove_stopwords
from django_tidb.fields.vector import CosineDistance
from timestamp_search.models import Video, TimeStamp, Conversation
from django.conf import settings
from timestamp_search.models import Chat
from timestamp_search.generate_embedding import get_embeddings

load_dotenv()

# Set these environment variables
URL = os.getenv("WCS_URL")
# print(os.getenv("OPENAI_API_KEY"))
APIKEY = os.getenv("WCS_API_KEY")
COLLECTION_NAME = "TEST_1"  # "YOUTUBE_COMPANION"
VIDEO_ID = "HLi2xYxZX10"


# def convert_time(seconds):
#     seconds = seconds % (24.0 * 3600.0)
#     hour = seconds // 3600.0
#     seconds %= 3600.0
#     minutes = seconds // 60.0
#     seconds %= 60.0
#     if hour:
#         return f"{hour}h{minutes}m{seconds}s"
#     elif minutes:
#         return f"{minutes}m{seconds}s"
#     else:
#         return f"{seconds}s"

class TiDBAI:
    def __init__(self, url, is_playlist=False) -> None:
        
        self.chunks_collection = None
        self.is_playlist = is_playlist
        self.url = url
        self.status = "training"

    # def initiate_collection(self):
    #     if self.client.collections.exists(self.collection_name):  
    #         self.client.collections.delete(self.collection_name)

    #     chunks_collection = self.client.collections.create(
    #         name=self.collection_name,
    #         properties=[
    #             wvc.config.Property(
    #                 name="chunk",
    #                 data_type=wvc.config.DataType.TEXT
    #             ),
    #             wvc.config.Property(
    #                 name="video_id",
    #                 data_type=wvc.config.DataType.TEXT
    #             ),
    #             wvc.config.Property(
    #                 name="user_id",
    #                 data_type=wvc.config.DataType.TEXT
    #             ),
    #             wvc.config.Property(
    #                 name="chunk_index",
    #                 data_type=wvc.config.DataType.INT
    #             ),
    #             wvc.config.Property(
    #                 name="video_title",
    #                 data_type=wvc.config.DataType.TEXT
    #             )
    #         ],
    #         vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),  # Use `text2vec-openai` as the vectorizer
    #         generative_config=wvc.config.Configure.Generative.openai(),  # Use `generative-openai` with default parameters
    #     )
    #     self.chunks_collection = chunks_collection

    def vectorize_video_data(self, chat_id):
        try:
            url_dict = {}
            time_stamp_instances = []

            if self.is_playlist:
                url_dict = get_video_urls_from_playlist(self.url)
            else:
                video_title = get_video_title(self.url)
                video_id = get_video_id(self.url)
                url_dict[video_id] = {"video_title": video_title, "video_url": self.url}
                

            for video_id, video_data in url_dict.items():
                print(video_data)
                video_url = video_data["video_url"]
                video_title = video_data["video_title"]
                print("================", video_title)
                chunked_text = youtube_transcript_loader(video_id)
                print("chunked_text")

                video_instance = Video(video_id=video_id,
                      video_title=video_title,
                      chat_id=chat_id)
                video_instance.save()

                # TODO: may need to provide uuid in `id` field explicitly
                for i, chunk in enumerate(chunked_text):
                    print(i, chunk.keys())
                    print(chunk["text"])
                    print(chunk["start_time"])
                    time_stamp_data = TimeStamp(
                        id=uuid.uuid4(),
                        video_id=video_instance.id,
                        embedding=chunk["embedding"],
                        chunk_index=i,
                        text=chunk["text"],
                        time_stamp=chunk["start_time"]
                    )
                    print(time_stamp_data)
                    time_stamp_instances.append(time_stamp_data)

                time_stamps = TimeStamp.objects.bulk_create(time_stamp_instances)
                print("created")
                self.status = "trained"
        except Exception as e:
            print(str(e))
            self.status = "failed"
            raise e
                
        
    def query_vector_db(self, chat, user_prompt, results_limit=5) -> list:
        try:
            keywords_to_query = remove_stopwords(user_prompt)
            prompt_embedding = get_embeddings(text=keywords_to_query)
            print("stopwords done")
            all_timestamps = []

            videos_objects = Video.objects.filter(chat=chat)
            video_objects_ids = [str(video.id) for video in videos_objects]

            # for video in videos_objects:
            #     all_timestamps.append(TimeStamp.objects.filter(video=video))

            all_timestamps = TimeStamp.objects.filter(video_id__in=video_objects_ids)
            response = all_timestamps.annotate(
                distance=CosineDistance('embedding', prompt_embedding)
            ).order_by('distance')[:3]

            if len(response) > results_limit:
                response = response[:results_limit]

            results = {}

            for timestamp in response:
                video_id = timestamp.video.video_id
                video_title = timestamp.video.video_title
                text = timestamp.text
                start_time = timestamp.time_stamp


                print("start time in  tidb::==",start_time)

                if not video_id in results.keys():
                    results[video_id] = {
                        "video_id": video_id,
                        "video_title": video_title,
                        "time_stamps": []
                    }

                results[video_id]["time_stamps"].append(
                    {
                        "caption": text,
                        "time_stamp": start_time
                    }
                )
            
            for timestamp in results.values():
                conversation_object = Conversation(
                    chat=chat,
                    prompt=user_prompt,
                    response=json.dumps(timestamp)
                )
                conversation_object.save()
            
            return results.values()
        except Exception as e:
            raise e



# https://www.youtube.com/watch?v=7pGuwV4rwH0&t=3.0m17.28s


def train_model(url, playlist, user_id, chat_id):
    start_time = time.time()
    # collection_name = create_collection_name(user_id=user_id, chat_id=chat_id)

    tidb_instance = TiDBAI(
        url=url,
        is_playlist=playlist
    )
    tidb_instance.vectorize_video_data(chat_id=chat_id)

    chat = Chat.objects.filter(user_id=user_id, id=chat_id).first()
    chat.status = tidb_instance.status
    chat.save()

    print("arrived here")
    

    end_time = time.time()
    print(f"total training time: {end_time-start_time} of chat `{chat.chat_title}`")

def query_db(chat, user_id, prompt):
    # collection_name = create_collection_name(chat_id=chat.id, user_id=user_id)
    # conversation = Conversation(
    #     chat=chat,
    #     prompt=prompt
    # )
    # conversation.save()

    tidb_instance = TiDBAI(
        url=chat.url,
        is_playlist=chat.playlist,
    )

    results_limit = 5 if chat.playlist else 3

    results = tidb_instance.query_vector_db(chat, prompt, results_limit)
    return results

