import base64
import traceback

# Third Party Imports
from django.contrib.auth import get_user_model
from rest_framework.views import APIView, status
from users.serializers import UserSerializer
from users.utils import custom_response, set_cookie
from django.conf import settings
from users.models import CustomUser




class UserSigninView(APIView):
    User = get_user_model()

    def post(self, request, *args, **kwargs):
        """
        API View for signing in user and returning User profile.
        """
        user = request.user
        # getting user profile
        serialized_user = UserSerializer(user)

        # Access the is_new_user check from the request
        # is_new_user = getattr(request, "is_new_user", False)

        response = custom_response(
            data=serialized_user.data,
            message="success",
            response_status=status.HTTP_200_OK,
        )

        # passing decoded token in cookie for future authentications
        decoded_token = base64.b64encode(request.decoded_token.encode()).decode()
        set_cookie(response, settings.SESSION_COOKIE_KEY, decoded_token)
        return response


class UserView(APIView):
    # permission_classes = []
    # authentication_classes = []

    def get(self, request, *args, **kwargs):
        """
        API View for viewing self profile.
        """
        try:
            user = request.user
            serialized_user = UserSerializer(user)
            response = custom_response(
                data=serialized_user.data,
                message="success",
                response_status=status.HTTP_200_OK,
            )
            return response
        except Exception as e:
            raise e

    def patch(self, request, pk=None):
        try:
            user = CustomUser.objects.get(id=pk)
            user = UserSerializer(instance=user, data=request.data, partial=True, context=user)
            if not user.is_valid():
                return custom_response(
                    data={},
                    success=False,
                    message=user.errors,
                    response_status=status.HTTP_400_BAD_REQUEST,
                )
            user.save()
            return custom_response(
                data=user.data,
                message="successfully updated user",
                response_status=status.HTTP_200_OK,
            )
        except CustomUser.DoesNotExist:
            return custom_response(
                data={},
                success=False,
                message=f"User with id {pk} does not exists.",
                response_status=status.HTTP_404_NOT_FOUND,
            )
        except Exception as e:
            return custom_response(
                data={},
                success=False,
                message=f"Error occurred in user patch. Traceback: {traceback.format_exc()}, Exception: {e}.",
                response_status=status.HTTP_404_NOT_FOUND,
            )

