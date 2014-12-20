FROM debian:jessie

MAINTAINER Yvonnick Esnault <yvonnick@esnau.lt>

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

ADD supervisord.conf.d/* /etc/supervisor/conf.d/
ADD crons.conf /opt/crons.conf
ADD startup.sh /opt/startup.sh

# Install MongoDB
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10 && \ 
    echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list && \
    apt-get -y update && \ 
    apt-get install -y supervisor cron mongodb-org vim && \
    mkdir -p /data/db && \ 
    mkdir -p /opt/backups && \ 
    apt-get clean && \
    chmod +x /opt/startup.sh && \
    crontab /opt/crons.conf && rm -f crons.conf

EXPOSE 27017

CMD ["/opt/startup.sh"]  