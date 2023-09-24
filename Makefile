build:
	docker compose build --build-arg USER=`id -u`

bash:
	docker compose run --service-ports app bash
