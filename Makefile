build:
	docker compose build --build-arg USER=`id -u`

sh:
	docker compose run --service-ports app sh
