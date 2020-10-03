build-docker:
	docker-compose build

package:
	docker save apps_4you-blackbox_app4you-blackbox | gzip > apps_4you-blackbox_app4you-blackbox.tar.gz

deploy: build-docker package
	scp apps_4you-blackbox_app4you-blackbox.tar.gz maciek@apps4you:/tmp