build-docker:
	docker-compose build

package:
	docker save apps_4you-frontend_app4you-frontend | gzip > apps_4you-frontend_app4you-frontend.tar.gz

clear:
	rm apps_4you-frontend_app4you-frontend.tar.gz

deploy: build-docker package
	scp apps_4you-frontend_app4you-frontend.tar.gz maciek@apps4you:/tmp

remote: build package deploy clear