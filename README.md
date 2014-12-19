# Docktor Stack

## Using Docker

- Docktor : see https://github.com/docktor/dockerfiles/tree/master/docker-docktor/README.md
- InfluxDB : see https://github.com/docktor/dockerfiles/tree/master/docker-influxdb/README.md
- Riemann : see https://github.com/docktor/dockerfiles/tree/master/docker-riemann/README.md
- Grafana : see https://github.com/docktor/dockerfiles/tree/master/docker-grafana/README.md
- GoryCadvisor : see https://github.com/docktor/dockerfiles/tree/master/docker-goryCadvisor/README.md

## Using fig

```
git clone https://github.com/docktor/dockerfiles
fig build && fig up
```

or by service : 

```
fig up cadvisor
fig build docktor && fig up docktor
fig build influxdb && fig up influxdb
fig build riemann && fig up riemann
fig build grafana && fig up grafana
fig build goryCadvisor && fig up goryCadvisor
```
