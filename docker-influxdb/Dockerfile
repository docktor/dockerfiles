FROM debian:jessie

MAINTAINER Yvonnick Esnault <yvonnick@esnau.lt>

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

ENV INFLUXDB_VERSION 0.8.6

ADD startup.sh /opt/startup.sh
ADD createDB.sh /opt/createDB.sh
ADD startSupervisorPrograms.sh /opt/startSupervisorPrograms.sh

RUN apt-get update && \
    apt-get install -y supervisor curl vim && \
    curl -s -o /opt/influxdb_latest_amd64.deb https://s3.amazonaws.com/influxdb/influxdb_${INFLUXDB_VERSION}_amd64.deb && \
    mkdir -p /opt/influxdb/shared/data && \
    dpkg -i /opt/influxdb_latest_amd64.deb && \
    rm -rf /opt/influxdb/shared/data && \
    chown -R daemon:daemon /opt/influxdb && \
    chmod +x /opt/startup.sh /opt/createDB.sh /opt/startSupervisorPrograms.sh && \
    rm -f /opt/*.deb && \
    mkdir /opt/influxdbconfig && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ADD supervisord.conf.d/* /etc/supervisor/conf.d/
ADD config.toml /opt/influxdbconfig/config.toml

# Admin server, HTTP API
# EXPOSE 8083 8086

CMD ["/opt/startup.sh"]