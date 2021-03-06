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
    alt: "Dockermon - Manage and Monitor Docker"
last_modified_at: 2022-03-03T10:23:16-04:00
toc: true
sidebar:
    nav: "docs"
---

## Dockermon - Docker Manager / Monitor

![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-preview.png?raw=true)

Dockermon is a Docker Host Monitor and Management system. It runs from a Docker Image as a container and communicates with the host via socket / HTTP connection. Providing an intuitive and informative utility packed web interface, it was written for DevOps, Software Developers, Docker Fans, Software Engineers or just about anyone who wants to explore Docker from a different perspective than the command line and Docker Desktop. 

The Docker Hub Image [webfreakeric/dockermon:latest](https://hub.docker.com/r/webfreakeric/dockermon){:target="_blank"} runs self contained and monitors your Docker via the [Docker Engine API v1.41](https://docs.docker.com/engine/api/v1.41){:target="_blank"} through Sockets and HTTP requests.

Dockermon has [worker jobs](https://drumfreak.github.io/dockermon/dockermon-backend) that collect stats for analyzing your containers. There's a backend API that allows you to create, maintain, monitor, manage and do just about anything you need with Docker containers, images, volumes, networks, and various aspects of your Docker setup. 

[Multi and Remote host control and monitoring is also possible!](https://drumfreak.github.io/dockermon/dockermon-remote-hosts) 

Dockermon provides you with a blazing fast [React/Next web interface](https://drumfreak.github.io/dockermon/dockermon-frontend) to manage and view your docker system. The web interface is secure and meant to be accessed locally. 

[Dockermon Host Launcher](https://drumfreak.github.io/dockermon/dockermon-host-launcher) (optional) is a companion app to mimic the launch Terminal, Finder, VS Code functionality of the official Docker Desktop app. The Host Launcher is in the source code you'll download here. The web interface creates a secure socket connection to the  and launches commands on your local machine such as Launch Terminal to attach to containers, watch logs via terminal and more. 


Read more:
- [Dockermon Features](https://drumfreak.github.io/dockermon/dockermon-features)
- [Dockermon Inspiration](https://drumfreak.github.io/dockermon/dockermon-inspiration)


<div class="content-spacer-sm"></div>

## Getting Started - Installation

### 1. Install Docker and NodeJS

- [Docker](https://docker.com){:target="_blank"}
- [NodeJs](https://nodejs.org){:target="_blank"} -- [NVM Recommended](https://github.com/nvm-sh/nvm){:target="_blank"}

Start the Docker Engine. Tune your settings. You do not need to do anything with Node at this point.

[Feeling Lucky? Jump to Quick Install](#quick-install)
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

### 3. Create Dockermon Docker Container

The easiest way setup your dockermon container is to git clone the repo as mentioned in Step 2 and run docker-compose. 

> Dockermon will expose the following ports. However, MySQL, Redis, and other service ports will be closed and only used internally.

| Port      |  Service |
| ----------- | ----------- |
| 3800      | Dockermon Frontend Web Port http://localhost:3800 |
| 3810      | Dockermon Nest HTTP Api http://localhost:3810 |
| 3811      | Dockermon Nest Websocket Api ws://localhost:3811 |
| 3801   | Optional Dockermon Host Launcher Port Run by this source code, not the container ws://localhost:3801  |


> The default settings are for Mac OS and Linux. You will need to modifiy your `DOCKERMON_DOCKER_LOCAL_SOCKET` in the .env if you're using Windows.

Let's get the Dockermon container running. Assuming Docker is running, you have the code and are inside the dockermon directory from Terminal, run:

```bash
docker-compose -p "dockermon" -f docker-compose.yml up --detach
```

> That didn't work? Docker must be running to create the dockermon container.

Now Dockermon should be launched and you can see it running in docker. Once the container launches it will install `node_modules` for the frontend and backend separately. This is going to take a few minutes and only runs the first time. The MySQL database will also initialize, create the tables, and the backend and workers will launch. Everything will fire up.

> Be patient. Give Dockermon a good 5 minutes to build, start up and start collecting stats.  

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

### 4. Optional Host Launcher

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

> Quick install only works for Mac OS and Linux. You will need to modifiy your `DOCKERMON_LOCAL_SOCKET_PATH` in the .env if you're using Windows.

``` bash
git clone https://github.com/drumfreak/dockermon.git
cd dockermon
cp .env.sample .env
docker-compose -p "dockermon" -f docker-compose.yml up --detach
npm install && npm run build && npm start
```

You should now have Dockermon running in Docker and the interface will be ready in about 3 - 5 minutes after node_modules installs and the workers have had a chance to assess your system.

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
- [Dockermon FAQ](/dockermon/dockermon-faq)

<hr />

Backend built with:
[Nest](https://github.com/nestjs/nest), [Node.js](https://nodejs.org), [TypOrm](https://typorm.io), [Nest Bull](https://github.com/nestjs/bull), [SocketIO](https://socket.io)

Frontend built with:
[React](https://reactjs.org), [Next.js](https://nextjs.org), [PrimeReact](https://www.primefaces.org/primereact), [Redux](https://redux.js.org/), [SocketIO](https://socket.io)

<hr />

## License

Nest is [MIT licensed](LICENSE).
