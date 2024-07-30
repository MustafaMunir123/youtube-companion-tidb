# Standard Library Imports
import base64
import json
import re

# Third Party Imports
import firebase_admin
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils.autoreload import logger
from firebase_admin import auth, credentials, firestore
from rest_framework import status
from rest_framework.exceptions import NotAuthenticated
from rest_framework.authentication import BaseAuthentication
from rest_framework.response import Response
import uuid


User = get_user_model()

"""SETUP FIREBASE CREDENTIALS"""
cred = credentials.Certificate(
    {
        "type": settings.FIREBASE_ACCOUNT_TYPE,
        "project_id": settings.FIREBASE_PROJECT_ID,
        "private_key_id": settings.FIREBASE_PRIVATE_KEY_ID,
        "private_key": settings.FIREBASE_PRIVATE_KEY.replace("\\n", "\n"),
        "client_email": settings.FIREBASE_CLIENT_EMAIL,
        "client_id": settings.FIREBASE_CLIENT_ID,
        "auth_uri": settings.FIREBASE_AUTH_URI,
        "token_uri": settings.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url": settings.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": settings.FIREBASE_CLIENT_X509_CERT_URL,
    }
)
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

"""FIREBASE AUTHENTICATION"""


class FirebaseAuthentication(BaseAuthentication):
    @staticmethod
    def get_id_token(request):
        print("get_id_token")
        token_from_cookie = request.COOKIES.get(settings.SESSION_COOKIE_KEY)
        if token_from_cookie:
            token = base64.b64decode(token_from_cookie).decode()
            return token, None
        auth_token = request.META.get("HTTP_AUTHORIZATION")
        if not auth_token:
            raise ValueError("No authentication token has been provided.")

        id_token = auth_token.split(" ").pop()
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception as e:
            logger.debug(f"Invalid authentication token has been provided. {e}")
            raise NotAuthenticated("Invalid authentication token.")

        if not id_token or not decoded_token:
            raise ValueError("Tokens have not been found.")

        return id_token, decoded_token

    def get_decoded_token(self, request):
        print("get_decoded_token")
        id_token, decoded_token = self.get_id_token(request)

        decoded_from_cookie = request.COOKIES.get(settings.SESSION_COOKIE_KEY)
        if decoded_from_cookie:
            decoded_from_cookie = base64.b64decode(decoded_from_cookie).decode()
            try:
                return json.loads(decoded_from_cookie)
            except json.JSONDecodeError:
                # Define a regular expression pattern
                # to match unquoted True and False
                pattern = r'\b(True|False)\b(?![\'"])'
                str_token = re.sub(pattern, r'"\1"', decoded_from_cookie)
                # Replace single-quoted to double-quoted strings
                str_token = str_token.replace("'", '"')
                return json.loads(str_token)

        return decoded_token

    @staticmethod
    def get_user(request, json_token, decoded_token):
        print("get_user")
        try:
            uid = json_token.get("uid")
            full_name = json_token.get("name")
            image_url = json_token.get("picture")
            email = json_token.get("email")
        except Exception as ex:
            logger.debug("The authentication token has no associated Firebase user.")
            raise ValueError(f"ABCD: {ex}")
        user, is_new_user = User.objects.get_or_create(
            firebase_id=uid,
            defaults={
                "full_name": full_name,
                "email": email,
                "image_url": image_url,
                "username": str(uuid.uuid4())
            },
        )
        return user, is_new_user

    def authenticate(self, request):
        print("authenticate")
        print(cred)
        try:
            requested_url = request.get_full_path()

            id_token, decoded_token = self.get_id_token(request)
            # print(request.decoded_token)
            json_token = decoded_token or self.get_decoded_token(request)
            request.decoded_token = json.dumps(json_token)
            user, is_new_user = self.get_user(request, json_token, decoded_token)

            # Non-Authorize for non-active
            if not is_new_user:
                print(is_new_user)
                print(user.is_active)
                if "login" in requested_url:
                    auth_token = request.META.get("HTTP_AUTHORIZATION")
                    request.decoded_token = ""

                    cookie_token = auth_token.split(" ").pop()
                    # verify_ip(request, user, cookie_token)
                    return user, None
                else:
                    if not user.is_active:
                        raise ValueError("User Not Permitted")
            else:
                setattr(request, "is_new_user", True)
            return user, None
        except Exception as e:
            raise ValueError(f"{e}")
