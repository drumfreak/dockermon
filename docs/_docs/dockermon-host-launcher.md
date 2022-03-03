---
permalink: /dockermon-host-launcher/
title: "Dockermon Host Launcher"
toc: false
---

<h3>Optional Host Launcher - The Source code included here</h3>

What is this? - Dockermon Host Launcher - Mac OS is a utility Nest / Node JS web socket server app that runs on your host machine for the web interface to mimic Docker Desktop launch Terminal, Finder and docker commands and etc. This only works on the local machine and expoes port `3801` by default. If you are remote monitoring a Docker instance you will not be able to launch terminals, open folders, etc. 

> This code is Open Source and available in [this repo](https://github.com/drumfreak/dockermon) for your sanity. Or [read here](/dockermon/dockermon-host-launcher).

To run the code in the `git clone` earlier, inside the `dockermon` diretory, run:

``` bash
npm install
npm run build
npm start
```

Tip add an &amp; at the end of npm run start: <b>npm run start &amp;</b> if you wish to run the host launcher in the background. If you wish to watch the output of the Host Launcher, run <b>npm run start</b> instead.

You should now see docker host launcher running on port 3801. You can change this port but it is not recommended.


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
