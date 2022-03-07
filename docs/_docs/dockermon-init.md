---
permalink: /dockermon-init/
title: "Dockermon Container Init Process"
toc: false
layout: single
---

## Dockermon Container Init Details

It's messy, but this is the beta launch startup script. Any suggestions are welcome. It's a docker container.

```bash
#! /bin/sh

if [ $DOCKERMON_ENABLE_GIT_UPDATE ]
then
    cd /app
    if [ ! -d "/app/dockermon-app/.git" ]
    then
        git clone https://github.com/drumfreak/dockermon-app.git
    fi

    cd dockermon-app

    if [ $DOCKERMON_ENABLE_GIT_BRANCH ]
    then
        git checkout $DOCKERMON_ENABLE_GIT_BRANCH
    fi
    git pull
fi

cd /app
/app/dockermon-app/app-start.sh
```

app-start.sh
``` bash
#! /bin/sh

if [ ! -f "/var/log/dockermon.log" ] 
then
    ln -s /dev/stdin /var/log/dockermon.log
fi

if [ -d "/root/.npm" ] 
then
    npm cache clean --force
    rm -rf /root/.npm
fi

/etc/init.d/redis-server start &
/usr/local/bin/docker-entrypoint.sh --initialize-insecure=false --default-authentication-plugin=mysql_native_password > /var/log/dockermon.log &
echo "USE mysql;" > /docker-entrypoint-initdb.d/timezones.sql &&  mysql_tzinfo_to_sql /usr/share/zoneinfo >> /docker-entrypoint-initdb.d/timezones.sql
  

if [ ! -f "/app/initialrun.txt" ]
then
  sleep 30
fi

if [ -f "/app/initialrun.txt" ]
then
    sleep 5
fi

if [ $DOCKERMON_ENABLE_SOCAT ]
then
    if [ -f "/usr/bin/socat" ]
    then
        echo "Launching socat - aka TACOS"
        /usr/bin/socat TCP-LISTEN:2375,reuseaddr,fork unix-connect:/var/run/docker.sock &
    fi
fi

echo "Starting Frontend"
cd /app/dockermon-app/frontend
./docker-entrypoint-frontend.sh &

echo "Starting backend"
cd /app/dockermon-app/backend 
./docker-entrypoint-backend.sh &

touch /app/initialrun.txt
tail -f /dev/stdin
```



<hr />

### Read more:

- [Dockermon Main](/dockermon)
- [Dockermon Features](/dockermon/dockermon-features)
- [Dockermon Inspiration](/dockermon/dockermon-inspiration)
- [Dockermon Backend Details](/dockermon/dockermon-backend)
- [Dockermon Frontend Details](/dockermon/dockermon-frontend)
- [Dockermon socat Socket Pipe](/dockermon/dockermon-socat)
- [Dockermon Container Image Build](/dockermon/dockermon-container-build)
- [Dockermon Container Init Process](/dockermon/dockermon-init)
- [Dockermon Container Github Updates](/dockermon/dockermon-remote-updates)
- [Dockermon Remote Host Management](/dockermon/dockermon-remote-hosts)
- [Dockermon Host Launcher - Mac OS](/dockermon/dockermon-host-launcher)
- [Dockermon FAQ](/dockermon/dockermon-faq)
