#!/bin/bash

export NODE_ENV=production

cd /opt/docktor/docktor && \
    git pull && \
    npm install --config.interactive=false && \
    grunt build
