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

if [ "x${RIEMANN_HOST_EVENT}" != "x" ]; then
    echo "=> RIEMANN_HOST_EVENT is specified. set to supervisord.gorycadvisor.conf file"

    sed -i -e "s/__RIEMANN_HOST_EVENT__/${RIEMANN_HOST_EVENT}/g" /etc/supervisor/conf.d/supervisord.gorycadvisor.conf
else
	echo "=> RIEMANN_HOST_EVENT is not specified. set '' to riemann_host_event in supervisord.gorycadvisor.conf file"
	sed -i -e "s/__RIEMANN_HOST_EVENT__//g" /etc/supervisor/conf.d/supervisord.gorycadvisor.conf
fi

if [ "x${RIEMANN_TTL_EVENT}" != "x" ]; then
    echo "=> RIEMANN_TTL_EVENT is specified. set to supervisord.gorycadvisor.conf file"

    sed -i -e "s/__RIEMANN_TTL_EVENT__/${RIEMANN_TTL_EVENT}/g" /etc/supervisor/conf.d/supervisord.gorycadvisor.conf
else
	echo "=> RIEMANN_TTL_EVENT is not specified. set '' to riemann_host_event in supervisord.gorycadvisor.conf file"
	sed -i -e "s/__RIEMANN_HOST_EVENT__/20/g" /etc/supervisor/conf.d/supervisord.gorycadvisor.conf
fi

/usr/bin/supervisord -c /etc/supervisor/supervisord.conf