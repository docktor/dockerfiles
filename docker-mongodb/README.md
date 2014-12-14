# Docker run

```
docker run -d \
	-p 3000:3000 \
	--link docktormongodb:db_1 \
    docktor/docktor:latest
```
See https://github.com/docktor/dockerfiles/tree/master/docker-docktor