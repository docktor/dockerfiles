#!/bin/bash

if [ "x${RIEMANN_ADDRESS}" = "x" ]; then
    echo "=> No RIEMANN_ADDRESS is specified (env RIEMANN_ADDRESS) - exit"
    exit 1;
fi

if [ "x${CADVISOR_ADDRESS}" = "x" ]; then
    echo "=> No CADVISOR_ADDRESS is specified (env CADVISOR_ADDRESS) - exit"
    exit 1;
fi

if [ "x${INTERVAL}" = "x" ]; then
    echo "=> No INTERVAL is specified (env INTERVAL) - exit"
    exit 1;
fi

echo "=> Configuring gorycadvisor"
sed -i -e "s/__RIEMANN_ADDRESS__/${RIEMANN_ADDRESS}/g" \
    -e "s/__CADVISOR_ADDRESS__/${CADVISOR_ADDRESS}/g" \
    -e "s/__INTERVAL__/${INTERVAL}/g" /etc/supervisor/conf.d/supervisord.gorycadvisor.conf

/usr/bin/supervisord -c /etc/supervisor/supervisord.conf