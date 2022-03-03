
<h2 align="center">
 Dockermon - Docker Monitoring and Management
</h2>

[See Official Documentation at GitHub Pages](https://drumfreak.github.io/dockermon)


![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-preview.png?raw=true)

Dockermon is a Docker Host Monitor and Management system. It runs from a Docker Image as a container and communicates with the host via socket / HTTP connection. This project also has a Companion Node/Nest "Host Launcher" App that runs to assist in managing docker. 

The Docker Hub Image [webfreakeric/dockermon-monitor](https://hub.docker.com/r/webfreakeric/dockermon-monitor) runs self contained (mostly, socat needed) and monitors your Docker via the [Docker Engine API v1.41](https://docs.docker.com/engine/api/v1.41) through Sockets and HTTP requests.

Dockermon has worker jobs that collect stats for analyzing your containers. There's an intuitive interface and backend API that allows you to create, maintain, monitor, manage and do just about anything you need with Docker containers, images, volumes, networks, and various aspects of your Docker setup. Multi and Remote host control and monitoring is also possible!

[Dockermon](https://drumfreak.github.io/dockermon) provides you with a blazing fast React/NextJS web interface to launch manage and view your docker system. Through the NestJS Host Companion included here, the web interface creates a socket connection and launches commands on your local machine. See Host Launcher section later.

Read more:

- [Dockermon Features](https://drumfreak.github.io/dockermon/dockermon-features)
- [Dockermon Inspiration](https://drumfreak.github.io/dockermon/dockermon-inspiration)
- [Dockermon Backend Details](https://drumfreak.github.io/dockermon/dockermon-backend)
- [Dockermon Frontend Details](https://drumfreak.github.io/dockermon/dockermon-frontend)

<hr />

## Installation

### 1. Install Docker and NodeJS

- [Docker](https://docker.com)
- [NodeJs](https://nodejs.org) -- [NVM Recommended](https://github.com/nvm-sh/nvm)

Start the Docker Engine. Tune your settings. You do not need to do anything with Node at this point.

<hr />

### 2. Clone this Repo
The first step is to start off in terminal in a directory and clone [this repo](https://github.com/drumfreak/dockermon) as follows:

``` bash
git clone https://github.com/drumfreak/dockermon.git
cd dockermon
cp .env.sample .env
npm install
```
Now you've got the code. Let's do something with it.

<hr />

### 3. Get socat Running

[Docker Engine API](https://docs.docker.com/engine/api/v1.41) on Mac OS is not exposed by default and cannot be exposed via the Docker Desktop App. However, through severals searches on the net and Stack Overflow, the software Gods have spoken and you can use [socat](https://www.npmjs.com/package/socat) for that.


> Warning and ultra important. Be sure that you are running a firewall on your system. Exposing port 2375 is a known docker port and you should ensure that no external access to this port is available.  We'll talk more about [Remote Host Support](https://drumfreak.github.io/dockermon/dockermon-remote-hosts) later.


``` bash
npm install -g socat
npm run socat
```

> Note: the npm run socat command above is in the package.json. It runs the socat command for you in the background and you must remember to run this anytime you reboot. The command is as follows. Do not run this command below. This is what is being run by `npm run socat` for your reference:

``` bash
socat TCP-LISTEN:2375,reuseaddr,fork UNIX-CLIENT:$HOME/Library/Containers/com.docker.docker/Data/docker.raw.sock
```

You may need to modify the socket path for your system. This is the standard Mac OS setup.

[Learn more about Dockermon and socat Here.](https://drumfreak.github.io/dockermon/dockermon-socat)

Once socat is running, dockermon can now connect to your Docker HTTP Engine.

<hr />

### 4. Create Dockermon Docker Container

The easiest way setup your dockermon container is to git clone the repo as mentioned earlier and run docker-compose. If you've followed the steps so far, you have the repo and are ready.

> Dockermon will expose the following ports. However, MySQL, Redis, and other service ports will be closed and only used internally.

| Service      |  Port |
| ----------- | ----------- |
| 3800      | Dockermon Frontend Web Port http://localhost:3800 |
| 3810      | Dockermon Nest HTTP Api http://localhost:3810 |
| 3811      | Dockermon Nest Websocket Api ws://localhost:3811 |
| 3801   | Optional Dockermon Host Launcher Port Run by this source code, not the container ws://localhost:3801  |


Let's get the Dockermon container running. Assuming Docker and socat are running, you have the code and are inside the dockermon directory, we are ready to party.

 From Terminal, run:

``` bash
docker-compose -p "dockermon" -f docker-compose.yml up
```

> That didn't work? Docker must be running to create the dockermon container.

Now Dockermon should be launched and you can see it running in docker. Once the container launches it will install `node_modules` for the frontend and backend separately. This is going to take a few minutes and only runs the first time. The MySQL database will also initialize, create the tables, and the backend and workers will launch. Everything will fire up, but `it will take a few minutes` the first time. After that, bootups will be a matter of a few seconds. 

Be patient. Give Dockermon a good 5 minutes to build, start up and start collecting stats.  

> The good news is all of the node_modules and database directories are stored in Docker volumes, so if you reinstall or recreate the container, it can pick up the existing volume and resume where you left off unless you delete the Docker volumes or prune ununsed.

- [Learn more about the Dockermon Container Image](https://drumfreak.github.io/dockermon/dockermon-container-build)

- [Learn more about the Dockermon Container Init Process](https://drumfreak.github.io/dockermon/dockermon-container-init)

Once you see the backend colorfully logging, you can access the web interface at [http://localhost:3800](http://localohst:3800)

The initial login details are as follows:

| Login      |  Credentials  |
| ----------- | ----------- |
| username      | `whale@dockermon.com` |
| password   | `dockermon` |

<hr />

### 5. Optional Host Launcher

What is this? - [Dockermon Host Launcher - Mac OS](https://drumfreak.github.io/dockermon/dockermon-host-launcher) is a utility Nest JS web socket server app that runs on your host machine for the web interface to mimic Docker Desktop launch Terminal, Finder and docker commands and etc. This only works on the local machine and expoes port `3801` by default. If you are remote monitoring a Docker instance you will not be able to launch terminals, open folders, etc. 

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

<hr />

## Parting Notes

This is not meant for production environments although you can connect to any Docker host that has the Engine API ports exposed. This is in the early development stages. In other words, use at your own risk, <b>do not use it in production</b>!!

Enjoy!

[Eric Rosebrock](https://github.com/drumfreak)


<hr />

## Read More

- [Dockermon Features](https://drumfreak.github.io/dockermon/dockermon-features)
- [Dockermon Inspiration](https://drumfreak.github.io/dockermon/dockermon-inspiration)
- [Dockermon Backend Details](https://drumfreak.github.io/dockermon/dockermon-backend)
- [Dockermon Frontend Details](https://drumfreak.github.io/dockermon/dockermon-frontend)
- [Dockermon socat Socket Pipe](https://drumfreak.github.io/dockermon/dockermon-socat)
- [Dockermon Container Image Build](https://drumfreak.github.io/dockermon/dockermon-container-build)
- [Dockermon Container Init Process](https://drumfreak.github.io/dockermon/dockermon-container-init)
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
