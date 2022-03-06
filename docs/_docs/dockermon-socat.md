---
permalink: /dockermon-socat/
title: "Dockermon socat"
toc: false
---

<h2 align="center">
 Dockermon socat - Socket Pipe
</h2>


> As of 03/06/2022 socat dependency is not needed. It is now bundled into Dockermon's container and handles everything internally. You will need to ensure Docker can map /var/run/docker.sock on your local system as a bind mount. Typically on MacOS / Linux you don't need to do anything, but if you get permission errors, add the /var/run/docker.sock to your Docker Desktop > Settings > Sharing section and try to create the dockermon container again.
> 

<h3>Socat Not Needed on Windows without Linux</h3>

[Docker Engine API](https://docs.docker.com/engine/api/v1.41){:target="_blank"}  may be exposable through the Docker Desktop App on Windows systems.

You may need to expose the port on your firewall. In Power Shell, you can run (AFTER REPLACING LAN_IP) with your Windows LAN IP address:

```
netsh interface portproxy add v4tov4 listenport=2375 listenaddress=LAN_IP connectaddress=127.0.0.1 connectport=2375

```


<h3>Socat on Windows With Docker Linux</h3>

> Since Docker for Windows can expose the Docker Engine API for Windows Containers on port 2375, this example will expose the Linux Docker on your Windows machine to port 2377.

If you chose the Linux subsystem then you will need to login to the Linux shell (I use Ubuntu) and install socat there. On my Windwos 10 with Ubuntu I login and run:

``` bash
socat TCP-LISTEN:2377,reuseaddr,fork UNIX-CLIENT:/var/run/docker.sock
```

On the Windows Power Shell, Run as Administator, (AFTER REPLACING LAN_IP) with your Windows LAN IP address run:

```
netsh interface portproxy add v4tov4 listenport=2377 listenaddress=LAN_IP connectaddress=127.0.0.1 connectport=2377
```


You should now be able to connect to Docker Engine API on remote Windows / Mac OS / Linux machines.


<hr />

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
