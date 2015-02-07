FROM debian:jessie

MAINTAINER Yvonnick Esnault <yvonnick@esnau.lt>

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

ENV VERSION_RIEMANN 0.2.6

ADD startup.sh /opt/startup.sh

RUN chmod +x /opt/startup.sh && \
    echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu precise main" | tee /etc/apt/sources.list.d/webupd8team-java.list && \
    echo "deb-src http://ppa.launchpad.net/webupd8team/java/ubuntu precise main" | tee -a /etc/apt/sources.list.d/webupd8team-java.list && \
    echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886 && \
    apt-get -y update && \
    apt-get install -y supervisor build-essential ruby2.1 ruby2.1-dev rubygems libghc-zlib-dev \
        net-tools inetutils-ping curl git telnet nmap socat dnsutils netcat tree vim \
        htop software-properties-common \
        oracle-java8-installer && \
    mkdir -p /opt/riemann && cd /opt/riemann && \
    echo "get http://aphyr.com/riemann/riemann-${VERSION_RIEMANN}.tar.bz2" && \
    curl --insecure https://aphyr.com/riemann/riemann-${VERSION_RIEMANN}.tar.bz2 | tar xj && \
    mv riemann-${VERSION_RIEMANN} riemann && \
    gem install riemann-client riemann-tools riemann-dash && \
    mv /opt/riemann/riemann/etc /opt/riemann/riemann/etc-origin && \
    sed -i -e "s|127.0.0.1|0.0.0.0|" /opt/riemann/riemann/etc-origin/riemann.config && \
    mkdir -p /opt/riemann/riemann/etc && \
    apt-get autoremove -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Use /opt/riemann/riemann/etc-origin to allow -v :/opt/riemann/riemann/etc

ADD supervisord.conf.d/* /etc/supervisor/conf.d/
ADD riemann.config /opt/riemann/riemann/etc-origin/riemann.config
ADD riemann-dash-config.rb /opt/riemann/riemann/etc-origin/riemann-dash-config.rb
ADD dash-config.json /opt/riemann/riemann/etc-origin/dash-config.json

#EXPOSE 4567 5555 5555/udp 5556

CMD ["/opt/startup.sh"]
