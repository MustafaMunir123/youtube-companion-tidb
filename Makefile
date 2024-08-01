migrate:
	python ./yt_companion_api/manage.py makemigrations && python ./yt_companion_api/manage.py migrate
run:
	python ./yt_companion_api/manage.py runserver
shell:
	python ./yt_companion_api/manage.py shell
install_req:
	pip install -r requirements.txt
admin:
	python ./yt_companion_api/manage.py createsuperuser
new:
	pip install -r requirements.txt && python ./yt_companion_api/manage.py makemigrations && python ./yt_companion_api/manage.py migrate && python ./yt_companion_api/manage.py createcachetable mush-cache
.PHONY: activate migrate run shell install_req admin
