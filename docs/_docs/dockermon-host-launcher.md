---
permalink: /dockermon-host-launcher/
title: "Dockermon Host Launcher"
toc: false
---

![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-host-launcher.png?raw=true)

## Optional Dockermon Host Launcher - Launch Terminal, Finder, VS Code for Docker Containers on Mac

What is this? The Dockermon Host Launcher (Mac OS) is a utility Nest / Node JS web socket server app that runs on your host machine for the web interface to mimic Docker Desktop launch Terminal, Finder and docker commands and etc. This only works on the local machine and exposes port `3801` by default. If you are remote monitoring a Docker instance you will not be able to launch terminals, open folders, etc. 

Note:

> This code is Open Source and available in [this repo](https://github.com/drumfreak/dockermon){:target="_blank"} for your sanity. Or [read here](/dockermon/dockermon-host-launcher). 


Another Note:

> The Dockermon Host Launcher ONLY works on your local Mac and while monitoring your local Docker instance. In other words, if you're monitoring another Docker Host, you can't launch Terminals, Finder or VS Code windows for remote hosts. 


## Build and Run the Dockermon Host Launcher

If you <b><em>have not cloned</em></b> the github repo from the [Readme](/dockermon/dockermon) and copied the .env file, run this from terminal in your preferred directory:

```bash
git clone https://github.com/drumfreak/dockermon.git
cd dockermon
cp .env.sample .env
```

Now you have the code, from inside the dockermon directory:

``` bash
npm install
npm run build
npm start
```

Tip add an &amp; at the end of npm run start: <b>npm run start &amp;</b> if you wish to run the host launcher in the background. If you wish to watch the output of the Host Launcher, run <b>npm run start</b> instead.

You should now see docker host launcher running on port 3801. You can change this port but it is not recommended.

There's not much to do with this app except login to the http://localhost:3800 interface and try to launch a terminal from a running container.

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
