---
permalink: /dockermon-remote-hosts/
title: "Dockermon Remote Host Monitoring"
toc: false
---

<h2 align="center">
 Dockermon Monitoring Remote Hosts
</h2>

![Dockermon](https://github.com/drumfreak/dockermon/blob/main/docs/images/dockermon-preview.png?raw=true)
<hr />

Dockermon can monitor remote Docker Hosts on your network. It requires access to the Docker Engine API and you can customize the port that you use via the directions below.

<hr />

<h3>Get socat Running (MacOS)</h3>

[Docker Engine API](https://docs.docker.com/engine/api/v1.41) on Mac OS is not exposed by default and cannot be exposed via the Docker Desktop App. However, through severals searches on the net and Stack Overflow, the software Gods have spoken and you can use [socat](https://www.npmjs.com/package/socat) for that.


> Warning and ultra important. Be sure that you are running a firewall on your system. Exposing port 2375 is a known docker port and you should ensure that no external access to this port is available.  We'll talk more about remote hosts later.


``` bash
npm install -g socat
npm run socat
```

> Note: the npm run socat command above is in the package.json. It runs the socat command for you in the background and you must remember to run this anytime you reobot. The command is as follows. Do not run this command below. This is what is being run by `npm run socat` for your reference:

``` bash
socat TCP-LISTEN:2375,reuseaddr,fork UNIX-CLIENT:$HOME/Library/Containers/com.docker.docker/Data/docker.raw.sock
```

You may need to modify this for your system. This is the standard Mac OS setup.

[Learn more about Dockermon and socat Here.](/dockermon/dockermon-socat)

Once socat is running, dockermon can now connect to your Docker HTTP Engine.

<hr />


<h3>Socat Not Needed on Windows without Linux</h3>

[Docker Engine API](https://docs.docker.com/engine/api/v1.41) may be exposable through the Docker Desktop App on Windows systems.

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

### Read more:

- [Dockermon Main](/dockermon)
- [Dockermon Features](/dockermon/dockermon-features)
- [Dockermon Inspiration](/dockermon/dockermon-inspiration)
- [Dockermon Backend Details](/dockermon/dockermon-backend)
- [Dockermon Frontend Details](/dockermon/dockermon-frontend)
- [Dockermon socat Socket Pipe](/dockermon/dockermon-socat)
- [Dockermon Container Image Build](/dockermon/dockermon-container-build)
- [Dockermon Container Init Process](/dockermon/dockermon-container-init)
- [Dockermon Container Github Updates](/dockermon/dockermon-remote-updates)
- [Dockermon Remote Host Management](/dockermon/dockermon-container-remote-hosts)
- [Dockermon Host Launcher - Mac OS](/dockermon/dockermon-host-launcher)
