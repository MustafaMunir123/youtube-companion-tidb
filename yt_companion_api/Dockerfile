FROM python:3.10.13
ENV PYTHONBUFFERED=1
WORKDIR /usr/src/apps/yt_companion/yt_companion_api
COPY ./ ./
RUN pip install -r requirements.txt --no-cache-dir
RUN python manage.py makemigrations && python manage.py migrate