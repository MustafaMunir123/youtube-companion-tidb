from django.contrib import admin
from timestamp_search.models import Chat, Conversation, TimeStamp, Video

admin.site.register(Chat)
admin.site.register(Conversation)
admin.site.register(TimeStamp)
admin.site.register(Video)