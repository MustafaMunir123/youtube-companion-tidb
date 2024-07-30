from rest_framework.views import APIView, status
from rest_framework.generics import ListAPIView
from timestamp_search.models import Chat, Conversation, Video, TimeStamp
from timestamp_search.serializers import ChatSerializer, TimeStampSerializer
from users.utils import custom_response
from timestamp_search.services import train_model, query_db

class ChatAPIView(APIView):

    def get(self, request, chat_id):
        try:
            user = request.user
            is_history = request.query_params.get("history")
            chat = Chat.objects.filter(user_id=user.id, id=chat_id).first()
            if not chat:
                return custom_response(
                    response_status=status.HTTP_400_BAD_REQUEST,
                    message=f"Chat does not exists with chat_id={chat_id}",
                    success=False,
                    data={}
                )
            serialized_data = dict(ChatSerializer(chat).data)
            # conversation_id = serialized_data.pop("last_conversation_id")
            # conversation_id = conversation_id if conversation_id else ""

            if is_history == "true":
                conversations = Conversation.objects.filter(chat_id=chat.id).order_by("created_at")
                history = []
                print(len(conversations))

                
                # conversation = Conversation.objects.filter(id=conversation_id.strip()).first()
                # if conversation:
                for conversation in conversations:
                    videos_list = []

                    videos = Video.objects.filter(conversation_id=conversation.id)
                    for video in videos:
                        time_stamps = TimeStamp.objects.filter(video_id=video.id).values("time_stamp", "caption", "id")
                        if time_stamps:
                            serialized_time_stamps = TimeStampSerializer(time_stamps, many=True).data
                            videos_list.append(
                                {
                                    "prompt": conversation.prompt,
                                    "video_title": video.video_title,
                                    "video_id": video.video_id,
                                    "time_stamps": serialized_time_stamps
                                }
                            )
                    history.extend(videos_list)
                serialized_data.update(
                    {"history": history}
                )


            return custom_response(
                response_status=status.HTTP_200_OK,
                message="success",
                success=True,
                data=serialized_data
            )
        except Exception as ex:
            raise ex
        
    def post(self, request):
        try:
            user = request.user
            url = request.data["url"]
            chat_title = request.data["chat_title"]
            playlist = False

            if "playlist" in url:
                playlist = True
            if Chat.objects.filter(chat_title=chat_title).exists():
                return custom_response(
                    response_status=status.HTTP_400_BAD_REQUEST,
                    message=f"Chat with title `{chat_title}` already exists",
                    success=False,
                    data={}
                )
            chat = Chat(
                chat_title=chat_title,
                url=url,
                playlist=playlist,
                status="training",
                user=user
            )
            chat.save()

            serialized_data = ChatSerializer(chat).data

            train_model(playlist=playlist, url=url, chat_id=chat.id, user_id=user.id)

            return custom_response(
                response_status=status.HTTP_200_OK,
                success=True,
                message="success",
                data=serialized_data
            )

        except Exception as e:
            raise e


class ChatListAPIView(ListAPIView):
    serializer_class = ChatSerializer

    def list(self, request):
        try:
            user = request.user

            chats = Chat.objects.filter(user_id=user.id)
            if chats:
                data = self.serializer_class(chats, many=True).data
            else:
                data = []

            return custom_response(
                data=data,
                success=True,
                message="success",
                response_status=status.HTTP_200_OK
            )
        except Exception as e:
            raise e
        

class PromptAPIView(APIView):

    def post(self, request, chat_id):
        try:
            user = request.user
            chat = Chat.objects.filter(id=chat_id).first()
            prompt = request.data["prompt"]
            if not chat:
                return custom_response(
                    response_status=status.HTTP_400_BAD_REQUEST,
                    message=f"Chat does not exists with chat_id={chat_id}",
                    success=False,
                    data={}
                )
            results = query_db(chat=chat, user_id=user.id, prompt=prompt)

            return custom_response(
                response_status=status.HTTP_200_OK,
                message="success",
                data=results,
                success=True
            )
            
        except Exception as e:
            raise e
        