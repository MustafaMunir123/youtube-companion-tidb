from django.apps import AppConfig
import nltk


class TimestampSearchConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'timestamp_search'

    # nltk.download('stopwords')
    # nltk.download('punkt')

    
