from timestamp_search.views import ChatAPIView, ChatListAPIView, PromptAPIView
from django.urls import path

urlpatterns = [
    path("chats/<uuid:chat_id>", ChatAPIView.as_view()),
    path("chats/initiate", ChatAPIView.as_view()),
    path("chats/all", ChatListAPIView.as_view()),
    path("chats/<uuid:chat_id>/prompt", PromptAPIView.as_view())
]