from django.db import models
from users.mixins import UUIDMixin
from users.models import CustomUser
from django_tidb.fields.vector import VectorField


TRAINING_STATUSES = (
    ("training", "training"),
    ("trained", "trained"),
    ("failed", "failed")
)

class Chat(UUIDMixin):
    chat_title = models.CharField(null=False, blank=False, max_length=200, unique=True)
    url = models.URLField(null=False, blank=False)
    playlist = models.BooleanField(default=False, null=True, blank=True)
    last_conversation_id = models.UUIDField(null=True, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="chats")
    status = models.CharField(null=True, blank=True, max_length=200, choices=TRAINING_STATUSES)

    def __str__(self) -> str:
        return f"{self.id} | {self.chat_title}"
    
class Conversation(UUIDMixin):
    chat = models.ForeignKey(Chat, related_name="user_prompts", on_delete=models.CASCADE)
    prompt = models.CharField(null=False, blank=False, max_length=1000)
    created_at = models.DateTimeField(auto_created=True, auto_now=True)
    # video_title = models.CharField(max_length=1000, null=True, blank=True)
    # video_id = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.id} | {self.prompt}"
    
class Video(UUIDMixin):
    video_title = models.CharField(max_length=1000, null=True, blank=True)
    video_id = models.CharField(max_length=100, null=True, blank=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="videos")

    def __str__(self) -> str:
        return f"{self.id} | {self.video_id} | {self.video_title}"
    
class TimeStamp(UUIDMixin):
    time_stamp = models.CharField(max_length=1000, null=False, blank=False)
    video = models.ForeignKey(Video, on_delete=models.CASCADE, related_name="time_stamps")
    embedding = VectorField(dimensions=800, db_comment="hnsw(distance=cosine)")
    text = models.TextField(null=False, blank=False)
    chunk_index=models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"{self.video.video_title} | {self.time_stamp} {self.caption}"

