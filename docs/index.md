---
layout: single
title: ""
permalink: /
breadcrumbs: false
author_profile: true
excerpt: "Dockermon - Manage and Monitor Docker"
layouts_gallery:
  - url: /images/dockermon-preview.png
    image_path: /images/dockermon-preview.png
    alt: "splash layout example"
last_modified_at: 2022-03-03T10:23:16-04:00
toc: true
sidebar:
    nav: "docs"
---

## Dockermon - Docker Manager / Monitor

![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-preview.png?raw=true)

Dockermon is a Docker Host Monitor and Management system. It runs from a Docker Image as a container and communicates with the host via socket / HTTP connection. Providing an intuitive and informative utility packed web interface, it was written for DevOps, Software Developers, Docker Fans, Software Engineers or just about anyone who wants to explore Docker from a different perspective than the command line and Docker Desktop. 

The Docker Hub Image [webfreakeric/dockermon-monitor:latest](https://hub.docker.com/r/webfreakeric/dockermon-monitor){:target="_blank"} runs self contained (mostly, socat needed) and monitors your Docker via the [Docker Engine API v1.41](https://docs.docker.com/engine/api/v1.41){:target="_blank"} through Sockets and HTTP requests.

Dockermon has [worker jobs](https://drumfreak.github.io/dockermon/dockermon-backend) that collect stats for analyzing your containers. There's a backend API that allows you to create, maintain, monitor, manage and do just about anything you need with Docker containers, images, volumes, networks, and various aspects of your Docker setup. 

[Multi and Remote host control and monitoring is also possible!](https://drumfreak.github.io/dockermon/dockermon-remote-hosts) 

[Dockermon](https://github.com/drumfreak/dockermon){:target="_blank"} provides you with a blazing fast [React/Next web interface](https://drumfreak.github.io/dockermon/dockermon-frontend) to manage and view your docker system. See [Dockermon Features](https://drumfreak.github.io/dockermon/dockermon-features) for more info. 

[Host Launcher](https://drumfreak.github.io/dockermon/dockermon-host-launcher) (optional) is a companion app to mimic the Launch Terminal, Finder, VS Code functionality of the official Docker Desktop app, Dockermon has a NestJS Host Launcher Companion in the source code you'll download. It creates a secure socket connection and launches commands on your local machine such as Launch Terminal to attach to containers, watch logs via terminal and more. 


Read more:
- [Dockermon Features](https://drumfreak.github.io/dockermon/dockermon-features)
- [Dockermon Inspiration](https://drumfreak.github.io/dockermon/dockermon-inspiration)


<div class="content-spacer-sm"></div>

## Getting Started - Installation

### 1. Install Docker and NodeJS

- [Docker](https://docker.com){:target="_blank"}
- [NodeJs](https://nodejs.org){:target="_blank"} -- [NVM Recommended](https://github.com/nvm-sh/nvm){:target="_blank"}

Start the Docker Engine. Tune your settings. You do not need to do anything with Node at this point.

[Feeling Lucky? Jump Quick Install](#quick-install)
(It's a really good idea to read below first!)

<div class="content-spacer-sm"></div>

### 2. Clone this Repo
The first step is to start off in terminal in a directory and clone [this repo](https://github.com/drumfreak/dockermon){:target="_blank"} as follows:

``` bash
git clone https://github.com/drumfreak/dockermon.git
cd dockermon
cp .env.sample .env
```
Now you've got the code. Let's do something with it.
<div class="content-spacer-sm"></div>

### 3. Get socat Running

[Docker Engine API](https://docs.docker.com/engine/api/v1.41){:target="_blank"} on Mac OS is not exposed by default and cannot be exposed via the Docker Desktop App. However, through several searches on the net and Stack Overflow, the Software Gods have spoken and you can use [socat](https://www.npmjs.com/package/socat){:target="_blank"} for that.


> Warning and ultra important. Be sure that you are running a firewall on your system. Exposing port 2375 is a known docker port and you should ensure that no external access to this port is available.  We'll talk more about [Remote Host Support](https://drumfreak.github.io/dockermon/dockermon-remote-hosts) later.


```bash
npm install -g socat
npm run socat
```

> Note: the npm run socat command above is in the package.json. It runs the socat command for you in the background and you must remember to run this anytime you reboot. The command is as follows. Do not run this command below. This is what is being run by `npm run socat` for your reference:

```bash
socat TCP-LISTEN:2375,reuseaddr,fork UNIX-CLIENT:$HOME/Library/Containers/com.docker.docker/Data/docker.raw.sock
```

You may need to modify the socket path for your system. This is the standard Mac OS setup.

[Learn more about Dockermon and socat Here.](https://drumfreak.github.io/dockermon/dockermon-socat)

Once socat is running, dockermon can now connect to your Docker HTTP Engine.

<div class="content-spacer-sm"></div>

### 4. Create Dockermon Docker Container

The easiest way setup your dockermon container is to git clone the repo as mentioned earlier and run docker-compose. If you've followed the steps so far, you have the repo and are ready.

> Dockermon will expose the following ports. However, MySQL, Redis, and other service ports will be closed and only used internally.

| Port      |  Service |
| ----------- | ----------- |
| 3800      | Dockermon Frontend Web Port http://localhost:3800 |
| 3810      | Dockermon Nest HTTP Api http://localhost:3810 |
| 3811      | Dockermon Nest Websocket Api ws://localhost:3811 |
| 3801   | Optional Dockermon Host Launcher Port Run by this source code, not the container ws://localhost:3801  |


Let's get the Dockermon container running. Assuming Docker and socat are running, you have the code and are inside the dockermon directory, we are ready to party.

 From Terminal, run:

```bash
docker-compose -p "dockermon" -f docker-compose.yml up
```

> That didn't work? Docker must be running to create the dockermon container.

Now Dockermon should be launched and you can see it running in docker. Once the container launches it will install `node_modules` for the frontend and backend separately. This is going to take a few minutes and only runs the first time. The MySQL database will also initialize, create the tables, and the backend and workers will launch. Everything will fire up, but `it will take a few minutes` the first time. After that, bootups will be a matter of a few seconds. 

Be patient. Give Dockermon a good 5 minutes to build, start up and start collecting stats.  

> The good news is all of the node_modules and database directories are stored in Docker volumes, so if you reinstall or recreate the container, it can pick up the existing volume and resume where you left off unless you delete the Docker volumes or prune ununsed.

- [Learn more about the Dockermon Container Image](https://drumfreak.github.io/dockermon/dockermon-container-build)

- [Learn more about the Dockermon Container Init Process](https://drumfreak.github.io/dockermon/dockermon-init)


<div class="content-spacer-sm"></div>

#### Login to Web Interface

Once you see the backend colorfully logging, you can access the web interface at [http://localhost:3800](http://localohst:3800){:target="_blank"}

The initial login details are as follows:

| Login      |  Credentials  |
| ----------- | ----------- |
| username      | `whale@dockermon.com` |
| password   | `dockermon` |

<div class="content-spacer-sm"></div>
### 5. Optional Host Launcher

What is this? - [Dockermon Host Launcher - Mac OS](https://drumfreak.github.io/dockermon/dockermon-host-launcher) is a utility Nest JS web socket server app that runs on your host machine for the web interface to mimic Docker Desktop launch Terminal, Finder and docker commands and etc. This only works on the local machine and exposes port `3801` by default. If you are remote monitoring a Docker instance you will not be able to launch terminals, open folders, etc. 

> Windows implementation of this host launcher will be available in future releases.

> This code is Open Source and available in [this repo](https://github.com/drumfreak/dockermon) for your sanity. Or [read here](https://drumfreak.github.io/dockermon/dockermon-host-launcher).

To run the code in the `git clone` earlier, inside the `dockermon` diretory, run:

``` bash
npm install
npm run build
npm start
```

> Tip add an &amp; at the end of npm run start: <b>npm run start &amp;</b> if you wish to run the host launcher in the background. If you wish to watch the output of the Host Launcher, run <b>npm run start</b> instead.

You should now see docker host launcher running on port 3801. You can change this port but it is not recommended.

<div class="content-spacer-sm"></div>

## Quick Install
This section was purposely placed at the bottom in hopes you have read everything above. 

You have Docker running. Node installed. Open Terminal. cd to your favorite directory.

> Quick install only works for Mac OS. You will need to modifiy your socat run commands as mentioned above if you're using Linux or Windows.

``` bash
git clone https://github.com/drumfreak/dockermon.git
cd dockermon
npm install -g socat && npm run socat
cp .env.sample .env
docker-compose -d -p "dockermon" -f docker-compose.yml up
npm install && npm run build && npm start
```

You should now have Dockermon running in Docker, connected to the socket through socat, and the interface will be ready in about 3 - 5 minutes after node_modules installs and the workers have had a chance to assess your system.

<div class="content-spacer-sm"></div>

## Parting Notes

This is not meant for production environments although you can connect to any Docker host that has the Engine API ports exposed. This is in the early development stages. In other words, use at your own risk, <b>do not use it in production</b>!!

Enjoy!
[Eric Rosebrock](https://github.com/drumfreak)

<div class="content-spacer"></div>
<hr />

## Read More

- [Dockermon Features](https://drumfreak.github.io/dockermon/dockermon-features)
- [Dockermon Inspiration](https://drumfreak.github.io/dockermon/dockermon-inspiration)
- [Dockermon Backend Details](https://drumfreak.github.io/dockermon/dockermon-backend)
- [Dockermon Frontend Details](https://drumfreak.github.io/dockermon/dockermon-frontend)
- [Dockermon socat Socket Pipe](https://drumfreak.github.io/dockermon/dockermon-socat)
- [Dockermon Container Image Build](https://drumfreak.github.io/dockermon/dockermon-container-build)
- [Dockermon Container Init Process](https://drumfreak.github.io/dockermon/dockermon-init)
- [Dockermon Container Github Updates](https://drumfreak.github.io/dockermon/dockermon-remote-updates)
- [Dockermon Remote Host Management](https://drumfreak.github.io/dockermon/dockermon-remote-hosts)
- [Dockermon Host Launcher - Mac OS](https://drumfreak.github.io/dockermon/dockermon-host-launcher)

<hr />

Backend built with:
[Nest](https://github.com/nestjs/nest), [Node.js](https://nodejs.org), [TypOrm](https://typorm.io), [Nest Bull](https://github.com/nestjs/bull), [SocketIO](https://socket.io)

Frontend built with:
[React](https://reactjs.org), [Next.js](https://nextjs.org), [PrimeReact](https://www.primefaces.org/primereact), [Redux](https://redux.js.org/), [SocketIO](https://socket.io)

<hr />


## License

Nest is [MIT licensed](LICENSE).
