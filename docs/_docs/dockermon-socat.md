---
permalink: /dockermon-socat/
title: "Dockermon socat"
toc: false
---

## Dockermon socat - Socket Pipe


> As of 03/06/2022 socat dependency is not needed. It is now bundled into Dockermon's container and handles everything internally. You will need to ensure Docker can map /var/run/docker.sock on your local system as a bind mount. Typically on MacOS / Linux you don't need to do anything, but if you get permission errors, add the /var/run/docker.sock to your Docker Desktop > Settings > Sharing section and try to create the dockermon container again.


This section pertains to monitoring remote Linux / MacOS hosts or if you do not wish to run Dockermon's internal socat due to permission errors or issues.

### Running alpine/socat Docker Container

There is a Docker Hub image that runs socat. This method has been bundled into the Dockermon container and is not needed for you to run Dockermon. Howerver, this is an alertnative if you wish to expose your Docker Engine API on remote hosts to use with Dockermon. This project creates a container, links your /var/run/docker.sock and exposes port 2376 for you to access the Docker Engine API. 

> You do not need this if you are running Dockermon and have socat enabled (default).

- [Docker Alpine Socat](https://github.com/alpine-docker/socat){:target="_blank"} is a good idea to potentially eliminate the need for external socat, however requires potentially setting up Docker Engine. Investigate this.

``` bash
docker run -d --restart=always \
    -p 127.0.0.1:2376:2375 \
    -v /var/run/docker.sock:/var/run/docker.sock \
    alpine/socat \
    tcp-listen:2375,fork,reuseaddr unix-connect:/var/run/docker.sock
```



> The above image exposes your Docker Engine API. Dockermon *does not* expose the Docker Engine API unless you expose port 2375 in the docker-compose.yml.

<hr />

### Socat on Windows With Docker Linux

> Since Docker for Windows can expose the Docker Engine API for Windows Containers on port 2375, this example will expose the Linux Docker on your Windows machine to port 2377.

If you chose the Linux subsystem then you will need to login to the Linux shell (I use Ubuntu) and install socat there. On my Windwos 10 with Ubuntu I login and run:

``` bash
socat TCP-LISTEN:2377,reuseaddr,fork unix-connect:/var/run/docker.sock
```

On the Windows Power Shell, Run as Administator, *(AFTER REPLACING LAN_IP)* with your Windows LAN IP address run:

```
netsh interface portproxy add v4tov4 connectaddress=127.0.0.1 connectport=2377 listenport=2377 listenaddress=LAN_IP
```


You should now be able to connect to Docker Engine API on remote Windows / Mac OS / Linux machines.


<hr />


### Socat Not Needed on Windows without Linux

[Docker Engine API](https://docs.docker.com/engine/api/v1.41){:target="_blank"}  may be exposable through the Docker Desktop App on Windows systems.

You may need to expose the port on your firewall. In Power Shell, you can run *(AFTER REPLACING LAN_IP)* with your Windows LAN IP address:

```
netsh interface portproxy add v4tov4 connectaddress=127.0.0.1 connectport=2375 listenport=2375 listenaddress=LAN_IP

```



### Read More

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
