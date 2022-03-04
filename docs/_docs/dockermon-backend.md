---
permalink: /dockermon-backend/
title: "Dockermon Backend Architecture"
toc: false
---

<h2 align="center">
 Dockermon Backend Details
</h2>

## Backend built with:
- [Nest](https://github.com/nestjs/nest){:target="_blank"}
- [Node.js](https://nodejs.org){:target="_blank"}
- [TypOrm](https://typorm.io){:target="_blank"}
- [Nest Bull](https://github.com/nestjs/bull){:target="_blank"}
- [SocketIO](https://socket.io){:target="_blank"}

<hr />

The backend was built using Node 14, Docker, MySQL 8, Debian Linux, Nest.js, TypeOrm, Websockets, and various other packages.

More details on that later. 


<hr />

## Dev Notes:
- [Docker Alpine Socat](https://github.com/alpine-docker/socat){:target="_blank"} is a good idea.

``` bash
docker run -d --restart=always \
    -p 127.0.0.1:2376:2375 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    alpine/socat \
    tcp-listen:2375,fork,reuseaddr unix-connect:/var/run/docker.sock
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
- [Dockermon Remote Host Management](/dockermon/dockermon-container-remote-hosts)
- [Dockermon Host Launcher - Mac OS](/dockermon/dockermon-host-launcher)
