from rest_framework import serializers
from timestamp_search.models import Chat, Conversation, TimeStamp, Video


class ChatSerializer(serializers.Serializer):
    id = serializers.UUIDField(allow_null=True, required=False)
    chat_title = serializers.CharField(required=True, max_length=200)
    url = serializers.URLField(required=False)
    is_playlist = serializers.BooleanField(default=False, allow_null=True)
    last_conversation_id = serializers.UUIDField(required=False, allow_null=True)
    status = serializers.CharField(required=True)
    user_id = serializers.UUIDField(allow_null=True, required=False)

    def create(self, validated_data):
        return Chat.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.chat_title = validated_data.get('chat_title', instance.chat_title)
        instance.url = validated_data.get('url', instance.url)
        instance.playlist = validated_data.get('playlist', instance.playlist)
        instance.last_conversation_id = validated_data.get('last_conversation_id', instance.last_conversation_id)
        instance.save()
        return instance
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        # print(data)
        data.pop("last_conversation_id")
        return data
    

class ConversationSerializer(serializers.Serializer):
    id = serializers.UUIDField(allow_null=True, required=False)
    chat_id = serializers.UUIDField()
    prompt = serializers.CharField(required=True, max_length=1000)
    created_at = serializers.DateTimeField()

    def create(self, validated_data):
        return Conversation.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.prompt = validated_data.get('prompt', instance.prompt)
        instance.save()
        return instance


class TimeStampSerializer(serializers.Serializer):
    id = serializers.UUIDField(allow_null=True, required=False)
    time_stamp = serializers.CharField(required=True, max_length=1000)
    caption = serializers.CharField(required=True, allow_blank=False)

    def create(self, validated_data):
        return TimeStamp.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.time_stamp = validated_data.get('time_stamp', instance.time_stamp)
        instance.caption = validated_data.get('caption', instance.caption)
        instance.save()
        return instance
    
class VideoSerailizer(serializers.Serializer):
    video_title = serializers.CharField(required=False, max_length=1000, allow_blank=True, allow_null=True)
    video_id = serializers.CharField(required=False, max_length=100, allow_blank=True, allow_null=True)
    conversation_id = serializers.UUIDField()

    def create(self, validated_data):
        return Video.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.video_title = validated_data.get('video_title', instance.video_title)
        instance.video_id = validated_data.get('video_id', instance.video_id)
        instance.save()
        return instance


