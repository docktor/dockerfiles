FROM debian:jessie

MAINTAINER Yvonnick Esnault <yvonnick@esnau.lt>

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

ENV GRAFANA_VERSION 1.9.0

ADD startup.sh /opt/startup.sh

RUN apt-get update && \
    apt-get install -y supervisor wget apache2-utils nginx vim && \
    cd /opt && \
    wget http://grafanarel.s3.amazonaws.com/grafana-${GRAFANA_VERSION}.tar.gz -O grafana.tar.gz && \
    tar zxf grafana.tar.gz && \
    rm grafana.tar.gz && \
    mv grafana-${GRAFANA_VERSION} /opt/app && \
    mv /opt/app/app/dashboards /opt/app/app/dashboards-origin && \
    echo "daemon off;" >> /etc/nginx/nginx.conf && \
    apt-get autoremove -y wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ADD sites-enabled/* /etc/nginx/sites-enabled/
ADD supervisord.conf.d/* /etc/supervisor/conf.d/
ADD config.js /opt/app/config.js
ADD dashboards/docktor.js /opt/app/app/dashboards-origin/docktor.js

CMD ["/opt/startup.sh"]