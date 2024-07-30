from django.urls import path


# Local Imports
from users.views import UserSigninView, UserView

urlpatterns = [
    path("login/", UserSigninView.as_view()),
]