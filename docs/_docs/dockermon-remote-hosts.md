---
permalink: /dockermon-remote-hosts/
title: "Dockermon Remote Host Monitoring"
toc: false
---

## Dockermon Monitoring Remote Hosts

![Dockermon](https://github.com/drumfreak/dockermon/blob/main/docs/images/dockermon-preview.png?raw=true)
<hr />

Dockermon can monitor remote Docker Hosts on your network. It requires access to the Docker Engine API and you can customize the port that you use via the directions below.

<hr />
<div class="content-spacer-sm"></div>

### Get socat Running (MacOS)

[Docker Engine API](https://docs.docker.com/engine/api/v1.41) on Mac OS is not exposed by default and cannot be exposed via the Docker Desktop App. However, through several searches on the net and Stack Overflow, the Software Gods have spoken and you can use [socat](/dockermon/dockermon-socat)  for that.


[Learn more about Dockermon and socat Here.](/dockermon/dockermon-socat)

Once socat is running on your remote host and the port is exposed, dockermon can now connect to your Remote Docker HTTP Engine.

<hr />
<div class="content-spacer-sm"></div>

### Joining Remote Hosts Is Easy

Login to Dockermon, go to System > Hosts > Join.  Enter the details about your remote host and Dockermon will attempt a connection and start propogating it's database with that host's information.



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
