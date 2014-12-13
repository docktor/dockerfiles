FROM debian:jessie

MAINTAINER Yvonnick Esnault <yvonnick@esnau.lt>

ENV DEBIAN_FRONTEND noninteractive
ENV DEBCONF_NONINTERACTIVE_SEEN true

ADD supervisord.conf.d/* /etc/supervisor/conf.d/
ADD startup.sh /opt/startup.sh
ADD updateDocktor.sh /opt/docktor/updateDocktor.sh

ENV NODE_ENV production

# Get Node.JS & NPM & GIT & config
RUN apt-get -y update && \
  apt-get -y install supervisor nodejs npm git && \
  ln -s /usr/bin/nodejs /usr/bin/node && \
  mkdir -p /home/docktor && \
  useradd -d /home/docktor -s /bin/sh docktor && \
  cd /home/docktor && \
  chown -R docktor:docktor . && \
  chmod -R go=u,go-w . && \
  echo 'docktor:docktorpass' | chpasswd && \
  chown -R docktor:docktor /opt/ && \
  chmod +x /opt/startup.sh /opt/docktor/updateDocktor.sh && \
  npm install -g bower && \
  npm install -g grunt-cli && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

USER docktor
RUN  cd /opt/docktor && \
  git clone https://github.com/yesnault/docktor.git docktor && \
  cd docktor && \
  npm install --config.interactive=false && \
  grunt build

USER root

CMD ["/opt/startup.sh"]