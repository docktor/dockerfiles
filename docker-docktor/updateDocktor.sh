#!/bin/bash

cd /opt/docktor/docktor && \
    git pull && \
    npm install && \
    grunt build && \
    bower install --config.interactive=false --allow-root && \
    supervisorctl restart docktor
