# goryCadvisor
goryCadvisor is a bridge between Riemann and cAdvisor. See https://github.com/docktor/goryCadvisor for more information.

# Docker run

Example :
```
docker run \
    -e RIEMANN_ADDRESS=192.168.59.104:5555 \
    -e CADVISOR_ADDRESS=192.168.59.104:8080 \
    -e INTERVAL=5s \
    docktor/gorycadvisor:latest
```