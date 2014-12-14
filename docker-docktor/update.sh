#!/bin/bash

# need to set NODE_ENV to dev before grunt build 
# to have file application.min.* (task uglify:production and cssmin:combine)
(export NODE_ENV=development && \
	echo "---------------> Updating with NODE_ENV=${NODE_ENV} and user `id`" && \
	cd /opt/docktor/docktor && \
	echo '---------------> Pulling...'  && \
    git pull && \
    echo '---------------> npm install...' && \
    npm install --config.interactive=false && \
    echo '---------------> Building...' && \
    grunt build && \
    echo '---------------> End Update')
