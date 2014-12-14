# goryCadvisor
goryCadvisor is a bridge between Riemann and cAdvisor. See https://github.com/docktor/goryCadvisor for more information.

# Docker run

```
docker run \
    -e RIEMANN_ADDRESS=<ip of riemann server>:5555 \
    -e CADVISOR_ADDRESS=<ip of cadvisor>:8080 \
    -e INTERVAL=5s \
    docktor/gorycadvisor:latest
```