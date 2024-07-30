# Third Party Imports
import math
import random

from django.conf import settings
from django.core.cache import cache
from django.core.exceptions import FieldError, ObjectDoesNotExist
from django.db import IntegrityError, OperationalError
from django.db.backends.utils import logger
from rest_framework import status
from rest_framework.views import Response, exception_handler


def custom_response(response_status, data, message, success=True):
    Response.status_code = response_status
    msg = {"success": success, "data": data, "message": message}
    return Response(msg)



def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    print(exc)
    if response is not None:
        response.data = error_response(str(exc))
        return response.data
    elif (
        isinstance(exc, FieldError)
        or isinstance(exc, AttributeError)
        or isinstance(exc, TypeError)
        or isinstance(exc, AssertionError)
        or isinstance(exc, OperationalError)
    ):
        response = error_response(str(exc))
    elif isinstance(exc, IntegrityError):
        response = error_response(str(exc).strip("\n").split("DETAIL:  ")[-1])
    elif isinstance(exc, ValueError) or isinstance(exc, ObjectDoesNotExist):
        response = error_response(str(exc))
    elif isinstance(exc, KeyError):
        response = error_response("Invalid Parameters")
    else:
        response = response

    # return response
    Response.status_code = status.HTTP_400_BAD_REQUEST
    return Response(
        data={
            "message": response.data.get("error"),
            "data": {},
            "success": False
        },
    )


def error_response(error_msg):
    return Response(
        {"success": False, "error": error_msg},
        status=status.HTTP_400_BAD_REQUEST,
    )


class CacheUtils:
    @staticmethod
    def set_cache(cache_key, data, time) -> None:
        try:
            cache.set(cache_key, data, time)
        except Exception as e:
            raise e

    @staticmethod
    def get_cache(cache_key) -> str:
        try:
            cached_data = cache.get(cache_key)
            return cached_data
        except Exception as e:
            raise e

    @staticmethod
    def delete_cache():
        try:
            cache.clear()
        except Exception as e:
            raise e


def set_cookie(response, key, value, max_age=3600):
    """set cookie and expiry in response"""
    try:
        cookie_secure = getattr(settings, "SESSION_COOKIE_SECURE", False)
        cookie_http_only = getattr(settings, "SESSION_COOKIE_HTTPONLY", False)
        cookie_path = getattr(settings, "SESSION_COOKIE_PATH", "\\")
        cookie_domain = getattr(settings, "SESSION_COOKIE_DOMAIN", "localhost")

        # setting cookie
        response.set_cookie(
            key,
            value,
            max_age,
            secure=cookie_secure,
            httponly=cookie_http_only,
            path=cookie_path,
            domain=cookie_domain,
        )
    except Exception as e:
        logger.error(f"An exception occurred while setting up cookie: {e}")
        raise BaseException
    return response


def clear_cookie(response, key):
    """clearing cookie"""
    cookie_domain = getattr(settings, "SESSION_COOKIE_DOMAIN", "localhost")

    try:
        response.delete_cookie(key, domain=cookie_domain)
    except Exception as e:
        logger.error(f"An exception occurred while clearing cookie: {e}")
        raise BaseException
    return response


# def generateOTP():
#     # Declare a string variable
#     # which stores all string
#     string = '0123456789'
#     OTP = ""
#     length = len(string)
#     for i in range(6):
#         OTP += string[math.floor(random.random() * length)]

#     return OTP
