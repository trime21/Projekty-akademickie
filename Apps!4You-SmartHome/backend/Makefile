build-docker:
	docker-compose build

package-backend:
	docker save apps_4you-backend_devices-service | gzip > apps_4you-backend_devices-service.tar.gz

scp-backend:
	scp apps_4you-backend_devices-service.tar.gz maciek@apps4you:/tmp

package-database:
	docker save apps_4you-backend_database | gzip > apps_4you-backend_database.tar.gz

scp-database:
	scp apps_4you-backend_database.tar.gz maciek@apps4you:/tmp

deploy: build-docker package-backend package-database scp-backend scp-database