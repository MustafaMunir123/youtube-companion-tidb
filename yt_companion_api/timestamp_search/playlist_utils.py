from pytube import Playlist, YouTube
from youtube_transcript_api import YouTubeTranscriptApi
import logging
from users.utils import custom_response
from rest_framework.views import status
from timestamp_search.models import Chat
from users.models import CustomUser
from timestamp_search.generate_embedding import get_embeddings


logger = logging.getLogger(__name__)

# p = Playlist('https://youtube.com/playlist?list=PLS1QulWo1RIaJECMeUT4LFwJ-ghgoSH6n')


def get_video_urls_from_playlist(playlist_url) -> dict:
    playlist = Playlist(playlist_url)

    data_dict = {}
    count = 0
    for video_url in playlist:
        video = YouTube(video_url)
        video_id = video.video_id
        video_title = video.title

        # video_id = get_video_id(video_url)
        # video_title = get_video_title(video_url)

        print(video_url)
        print(video_title)
        print(video_id)
        count += 1
        if count > 20:
            return custom_response(
                message="Quota Exceeded - can only train 20 videos at a time",
                data={},
                response_status=status.HTTP_200_OK,
                success=True
            )

        data_dict[video_id] = {"video_title": video_title, "video_url": video_url}
    print(count)
    return data_dict

# get_video_urls_from_playlist('https://youtube.com/playlist?list=PLS1QulWo1RIaJECMeUT4LFwJ-ghgoSH6n')


def get_video_title(video_url):
    video = YouTube(video_url)
    return video.title

def get_video_id(video_url):
    video = YouTube(video_url)
    return video.video_id


# with open("playlist_data.json", "w+") as file:
#     file.write(json.dumps(data_dict))

# https://www.youtube.com/watch?v=41qgdwd3zAg&t=10.0m28.980000000000018s


def youtube_transcript_loader(video_id):
    try:
        logger.info(
            f"Loading transcript for youtube video id: {video_id} using YouTubeTranscriptApi "
        )
        try:
            transcripts = YouTubeTranscriptApi.get_transcript(video_id, languages=('en',))
        except Exception as e:
            print(str(e))
            raise e

        entire_script = []
        length_of_transcripts = len(transcripts)
        # print(length_of_transcripts)

        for i in range(0, length_of_transcripts, 5):
            """
            transcript = {'text': 'watching', 'start_time': 1694.46, 'duration': 2.42}
            """
            combined_transcripts = {
                "text": "",
                "start_time": 0.0,
                "duration": 0.0,
                "embedding": []
            }

            combined_transcripts["text"] += transcripts[i].get("text") + " "
            combined_transcripts["start_time"] = transcripts[i].get("start")
            combined_transcripts["duration"] += transcripts[i].get("duration")

            if i+1 < length_of_transcripts:
                combined_transcripts["text"] += transcripts[i+1].get("text") + " "
                combined_transcripts["duration"] += transcripts[i+1].get("duration")
            if i+2 < length_of_transcripts:
                combined_transcripts["text"] += transcripts[i+2].get("text") + " "
                combined_transcripts["duration"] += transcripts[i+2].get("duration")
            if i+3 < length_of_transcripts:
                combined_transcripts["text"] += transcripts[i+3].get("text") + " "
                combined_transcripts["duration"] += transcripts[i+3].get("duration")
            if i+4 < length_of_transcripts:
                combined_transcripts["text"] += transcripts[i+4].get("text") + " "
                combined_transcripts["duration"] += transcripts[i+4].get("duration")
            if i+5 < length_of_transcripts:
                combined_transcripts["text"] += transcripts[i+5].get("text") + " "
                combined_transcripts["duration"] += transcripts[i+5].get("duration")
            combined_transcripts["text"].strip(" ")

            combined_transcripts["embedding"] = get_embeddings(combined_transcripts["text"])

            entire_script.append(combined_transcripts)
            print(f'{i+1} Text: {combined_transcripts["text"]}')


        logger.info(
            f"Loaded transcript for youtube video id: {video_id} using YouTubeTranscriptApi"
        )
        return entire_script

    except Exception as e:
        logger.error("Error in YouTubeTranscriptApi: ", e)
        raise Exception("Error in YouTubeTranscriptApi: ", e)


# def create_collection_name(user_id, chat_id):
#     chat = Chat.objects.get(id=chat_id)
#     user = CustomUser.objects.get(id=user_id)
#     # collection_name = str(user_id)[-6:] + str(chat_id)[-6:]
#     collection_name = str(user.full_name) + str(chat.chat_title)
#     collection_name = collection_name.replace(" ", "_")
#     print(collection_name)
#     return collection_name