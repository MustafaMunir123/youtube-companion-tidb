import weaviate
import os
import json
import time
from dotenv import load_dotenv
import weaviate.classes as wvc
from timestamp_search.playlist_utils import youtube_transcript_loader
from timestamp_search.playlist_utils import get_video_urls_from_playlist, get_video_title, get_video_id, create_collection_name
from timestamp_search.stopwards_removal import remove_stopwords
from timestamp_search.models import Video, TimeStamp, Conversation
from weaviate.classes.query import MetadataQuery, Filter
from weaviate.classes.query import HybridFusion
from django.conf import settings
from timestamp_search.models import Chat

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

class WeaviateAI:
    def __init__(self, client, collection_name, url, is_playlist=False, conversation_id=None) -> None:
        
        self.client = client
        self.collection_name = collection_name
        self.chunks_collection = None
        self.is_playlist = is_playlist
        self.url = url
        self.status = "training"
        self.conversation_id=conversation_id

    def initiate_collection(self):
        if self.client.collections.exists(self.collection_name):  
            self.client.collections.delete(self.collection_name)

        chunks_collection = self.client.collections.create(
            name=self.collection_name,
            properties=[
                wvc.config.Property(
                    name="chunk",
                    data_type=wvc.config.DataType.TEXT
                ),
                wvc.config.Property(
                    name="video_id",
                    data_type=wvc.config.DataType.TEXT
                ),
                wvc.config.Property(
                    name="user_id",
                    data_type=wvc.config.DataType.TEXT
                ),
                wvc.config.Property(
                    name="chunk_index",
                    data_type=wvc.config.DataType.INT
                ),
                wvc.config.Property(
                    name="video_title",
                    data_type=wvc.config.DataType.TEXT
                )
            ],
            vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),  # Use `text2vec-openai` as the vectorizer
            generative_config=wvc.config.Configure.Generative.openai(),  # Use `generative-openai` with default parameters
        )
        self.chunks_collection = chunks_collection

    def vectorize_video_data(self):
        try:
            url_dict = {}

            if self.is_playlist:
                url_dict = get_video_urls_from_playlist(self.url)
            else:
                video_title = get_video_title(self.url)
                video_id = get_video_id(self.url)
                url_dict[video_id] = {"video_title": video_title, "video_url": self.url}

            for video_id, video_data in url_dict.items():
                # print(video_data)
                video_url = video_data["video_url"]
                video_title = video_data["video_title"]
                print("================", video_title)
                chunked_text = youtube_transcript_loader(video_id)

                chunks_list = list()
                for i, chunk in enumerate(chunked_text):
                #     data_properties = {
                #         "video_id": video_id,
                #         "chunk": chunk,
                #         "chunk_index": i,
                #         "user_id": "user_id",  # TODO: replace with actual user_id for multi user support
                #         "video_title": video_title
                #     }
                #     data_object = wvc.data.DataObject(properties=data_properties)
                #     chunks_list.append(data_object)
                # if chunked_text:
                #     self.chunks_collection.data.insert_many(chunks_list)

                self.status = "trained"
        except Exception as e:
            print(str(e))
            self.status = "failed"
                
        
    def query_vector_db(self, user_prompt, results_limit=5) -> list:
        try:

            keywords_to_query = remove_stopwords(user_prompt)

            self.chunks_collection = self.client.collections.get(self.collection_name)
            response = self.chunks_collection.query.hybrid(
                query=keywords_to_query,
                fusion_type=HybridFusion.RELATIVE_SCORE,
                limit=results_limit,
                query_properties=["chunk^2"],
                return_metadata=MetadataQuery(distance=True),
                filters=Filter.by_property("user_id").equal("user_id") # TODO: replace with actual user_id for multi user support
            )

            for object in response.objects:
                print(f"\n===== Object index: [{object.properties['chunk_index']}] =====")
                print(f'_________________________ {object.properties}')
                print(object.properties["chunk"])

            videos = {}

            for object in response.objects:
                properties = object.properties
                video_id = properties["video_id"]
                video_title = properties["video_title"]
                chunk = properties["chunk"]
                # print(video_title)

                # json_object = json.loads(chunk)
                json_object = dict(eval(chunk))
                print(json_object)
                start_time = json_object["start_time"]
                text = json_object["text"]
                # video_title = chunk["video_title"]

                print("start time in qv db::==",start_time)

                if not video_id in videos.keys():
                    videos[video_id] = []
                videos[video_id].append(
                    {
                        "time_stamp": start_time,
                        "caption": text,
                        "video_title": video_title
                    }
                )

            results = []


            for id, data in videos.items():
                print("creating video")
                
                video = Video(
                    video_title=data[0]["video_title"],
                    conversation_id=self.conversation_id,
                    video_id=id
                )
                video.save()
                print(f"video_id {video.id}")

                time_stamps = [
                        {
                        "time_stamp" : data_object["time_stamp"],
                        "caption": data_object["caption"],
                        "video_id": video.id
                        } for data_object in data
                    ]
                time_stamps_objects = [
                    TimeStamp(
                        time_stamp=time_stamp["time_stamp"],
                        caption=time_stamp["caption"],
                        video_id=time_stamp["video_id"]
                    ) for time_stamp in time_stamps
                ]
                TimeStamp.objects.bulk_create(time_stamps_objects)
                
                aggregated_data = {
                        "video_title": data[0]["video_title"],
                        "video_id": id,
                        "time_stamps": time_stamps
                    }

                results.append(
                    aggregated_data
                )
            
            return results
        except Exception as e:
            raise e



# https://www.youtube.com/watch?v=7pGuwV4rwH0&t=3.0m17.28s


def train_model(url, playlist, user_id, chat_id):
    start_time = time.time()
    collection_name = create_collection_name(user_id=user_id, chat_id=chat_id)

    weaviate_ai = WeaviateAI(
        client=settings.WEAVIATE_CLIENT,
        collection_name=collection_name,
        # url="https://youtube.com/playlist?list=PLS1QulWo1RIaJECMeUT4LFwJ-ghgoSH6n",
        url=url,
        is_playlist=playlist
    )
    weaviate_ai.initiate_collection()
    weaviate_ai.vectorize_video_data()

    chat = Chat.objects.filter(user_id=user_id, id=chat_id).first()
    chat.status = weaviate_ai.status
    chat.save()
    

    end_time = time.time()
    print(f"total training time: {end_time-start_time} of collection `{weaviate_ai.collection_name}`")

def query_db(chat, user_id, prompt):
    collection_name = create_collection_name(chat_id=chat.id, user_id=user_id)
    conversation = Conversation(
        chat=chat,
        prompt=prompt
    )
    conversation.save()

    weaviate_ai = WeaviateAI(
        client=settings.WEAVIATE_CLIENT,
        collection_name=collection_name,
        # url="https://youtube.com/playlist?list=PLS1QulWo1RIaJECMeUT4LFwJ-ghgoSH6n",
        url=chat.url,
        is_playlist=chat.playlist,
        conversation_id=conversation.id
    )

    results_limit = 5 if chat.playlist else 3

    results = weaviate_ai.query_vector_db(prompt, results_limit)
    return results

