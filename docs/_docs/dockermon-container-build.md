---
permalink: /dockermon-container-build/
title: "Docker Image Build Process"
toc: false
---
## Dockermon Container / Image Build Details

The Dockermon container was tagged off of mysql/debian-8 container. From there it was tagged as webfreakeric/debian:0.1. After that, it was built with the following Dockerfile:

```bash
FROM webfreakeric/debian:0.2
WORKDIR /
RUN rm -rf /var/lib/apt/lists/* && \
rm -rf /etc/apt/sources.list.d/* && \
apt-get update && \
apt-get clean  && \
apt-get install -yq git curl gnupg iputils-ping vim procps redis tzdata socat && \
curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN rm -rf /etc/apt/sources.list.d/* 
```

This installs Redis, Node 14, Git, socat and a few other basic utils to the system and then cleans the image of any temporary files.

From there, the image was exported and flattened into a new image to remove history / contexts (a problem with Docker is you can overload an image and it becomes massive).  After that flattening, it's built with the docker-compose.yml file and another build process which copies the [dockermon-app](https://github.com/drumfreak/dockermon-app){:target="_blank} code to the image and prepares it for distribution.

After that the image is packaged and pushed as [webfreakeric/dockermon:latest](https://hub.docker.com/r/webfreakeric/dockermon){:target="_blank"}  and you can access it on Docker Hub.


<div class="content-spacer-sm"></div>
<hr />

### Container Environment Vars

The folling Environment Vars may be set, but not recommended you change them at this stage of the project development.


| Var      |  Use  | Default Value |
| ----------- | ----------- |  ----------- |
| DOCKERMON_CURRENT_ENV | for internal | dev |
| DOCKERMON_FRONTEND_PORT | for internal | 3800 |
| DOCKERMON_BACKEND_API_PORT | for internal | 3810 |
| DOCKERMON_BACKEND_WS_PORT | for internal | 3811 |
| DOCKERMON_HOST_LAUNCHER_PORT | for internal | 3801 |
| DOCKERMON_WORKER_HOST_ADDRESS | for internal | host.docker.internal |
| DOCKERMON_WORKER_HTTP_PORT | for internal | 3820 | 
| DOCKERMON_ENABLE_GIT_UPDATE | for updaes | 1 | 
| DOCKERMON_ENABLE_GIT_BRANCH | for updaes | main | 
| DOCKERMON_ENABLE_SOCAT | for docker api | 1 |
| DOCKERMON_DOCKER_LOCAL_SOCKET | local socket | /var/run/docker.sock |
| DOCKERMON_CURRENT_ENV | for internal | prod |

<div class="content-spacer-sm"></div>

### Container Image and Volume Sizes

The following are estimated file sizes without data in the database as of version 0.1 initial release.

| Disk      | Size  |
| ----------- | ----------- |
| Base Image `webfreakeric/dockermon-monitor` | 748.77 MB |
| Backend `dockermon_node_modules-be` Volume | 83.02 MB |
| Frontend `dockermon_node_modules-fe` Volume | 284.2 MB |
| MySQL Data `dockermon_db-data` Volume | 0 MB |

<b>Total Estimated New Install: 1.1Gb Disk space</b>

<div class="content-spacer-sm"></div>

## docker-compose:

.env file

``` bash
DOCKERMON_LOGGING="json-file"
DOCKERMON_BACKEND_WS_PORT=3811
DOCKERMON_BACKEND_API_PORT=3810
DOCKERMON_FRONTEND_PORT=3800
DOCKERMON_HOST_LAUNCHER_PORT=3801
DOCKERMON_WORKER_HTTP_PORT=3820
DOCKERMON_WORKER_HOST_ADDRESS="host.docker.internal"
DOCKERMON_ENABLE_GIT_UPDATE=1
DOCKERMON_ENABLE_GIT_BRANCH="main"
DOCKERMON_ENABLE_SOCAT=1
DOCKERMON_DOCKER_LOCAL_SOCKET="/var/run/docker.sock"
DOCKERMON_CURRENT_ENV="prod"

REDIS_PORT=6379
REDIS_HOST="localhost"
MYSQL_DOCKER_PORT=3306
MYSQL_DOCKER_PORT=3306
MYSQL_LOCAL_PORT=3306
MYSQL_DEV_PORT=3306
MYSQL_DEV_USER="root"
MYSQL_DEV_DB="dockermon"
MYSQL_DEV_PW="dockermon"
MYSQL_DEV_HOST="localhost"
```

docker-compose.yml

``` bash
version: '3.8'
services:
  dockermon:
    container_name: dockermon
    image: webfreakeric/dockermon:latest
    command: /bin/bash /app/dockermon-app/start.sh
    restart: always
    env_file: ./.env
    deploy:
      labels:
        com.docker.compose.project: 'dockermon'
    environment:
      DOCKERMON_BACKEND_WS_PORT: $DOCKERMON_BACKEND_WS_PORT
      DOCKERMON_BACKEND_API_PORT: $DOCKERMON_BACKEND_API_PORT
      DOCKERMON_FRONTEND_PORT: $DOCKERMON_FRONTEND_PORT
      DOCKERMON_WORKER_HOST_ADDRESS: $DOCKERMON_WORKER_HOST_ADDRESS
      DOCKERMON_HOST_LAUNCHER_PORT: $DOCKERMON_HOST_LAUNCHER_PORT
      DOCKERMON_ENABLE_GIT_UPDATE:  $DOCKERMON_ENABLE_GIT_UPDATE
      DOCKERMON_ENABLE_GIT_BRANCH:  $DOCKERMON_ENABLE_GIT_BRANCH
      MYSQL_ROOT_PASSWORD: $MYSQL_DEV_PW
      MYSQL_DATABASE: $MYSQL_DEV_DB
      MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
      TZ: America/New_York
    ports:
      - $DOCKERMON_FRONTEND_PORT:3800
      - $DOCKERMON_BACKEND_API_PORT:$DOCKERMON_BACKEND_API_PORT
      - $DOCKERMON_BACKEND_WS_PORT:$DOCKERMON_BACKEND_WS_PORT
      - $DOCKERMON_DOCKER_LOCAL_SOCKET:/var/run/docker.sock
    volumes:
      # - dockermon_db-config:/etc/mysql
      - dockermon_db-data:/var/lib/mysql
      - dockermon_node_modules_fe:/app/dockermon-app/frontend/node_modules
      - dockermon_node_modules_be:/app/dockermon-app/backend/node_modules
      # - ./db/backup/files/:/data_backup/data
    logging:
      driver: $DOCKERMON_LOGGING
    cap_add:
      - SYS_NICE # CAP_SYS_NICE

volumes:
  dockermon_db-data:
  dockermon_node_modules_fe:
  dockermon_node_modules_be:

```

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
