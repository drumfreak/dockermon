---
permalink: /dockermon-backend/
title: "Dockermon Backend Architecture"
toc: false
---

## Dockermon Backend

The backend / server was built using Node 14, Docker, MySQL 8, Debian Linux and various other packages. Read more: [Dockermon Container Image Build](/dockermon/dockermon-container-build)

## Dockermon App Backend API: 

The backend API was built using:

- [Nest](https://github.com/nestjs/nest){:target="_blank"}
- [Node.js](https://nodejs.org){:target="_blank"}
- [TypOrm](https://typorm.io){:target="_blank"}
- [Nest Bull](https://github.com/nestjs/bull){:target="_blank"}
- [SocketIO](https://socket.io){:target="_blank"}

<hr />

### Main Backend Dockermon API - NestJS


![Dockermon Backend Code](https://drumfreak.github.io/dockermon/images/dockermon-backend-code.png?raw=true)

The Dockermon backend API on HTTP port 3810 and Web Socket 3811 is responsible for managing the database connections, the REST HTTP API and the web socket server. 

This API also subscribes to Docker Engine's Events for updates when anything changes in Docker. All events are logged in Activity Logs you find on the Frontend.

This backend uses JWT Authentication tokens to secure the backend routes. The only routes not authenticated are the login routes for HTTP, and IDENTIFY or PING on WebSockets. This is why you must login to use Dockermon, and you are assigned an Auth Token which is used to access the backend.

### Dockermon Worker 1 - Cronjob

Running in a separate Node process is Worker 1, aka "The Cronjob".  This worker keeps the site stats up to date as well as monitors the status of objects changing within Docker. It runs a couple of jobs:

- 30 second interval Bull Scheduler job to check for Docker container stats on running containers. This is your stats interval for the database driven stats charts, as well as UI updates for non-event driven Docker changes.
- 2 Minute Docker Usage Update job. Docker Usage (df) is a heavy request on the Docker engine, therefore it's updated every 2 minutes. The main stats that are affected by Docker Usage is disk usage. This is checked with Docker on this job.

### Dockermon Worker 2 - Profiler

Running in a separate Node process is Worker 2 aka "The Profiler".  This worker runs the job of profiling your docker containers when you have the profiler active and monitoring a container. It's a heavy task, so this has been pushed off into it's own separate node process.  Profiler uses the Docker Stats API which creates a live stream and receives updates from Docker about the container CPU, Memory, Network, Disk Read / Write, etc.  This is the data sampled for the profiler which is based on interval readings (ie: 1 second comparisons). 

The data collected by this is transmitted to the frontend and that's what you see in your charts when running profilers.   Every 10 seconds the data is saved to the database as data set.  Once the client disconnects from the profiler, or stops the profiler job, the data is saved and the job is terminated.


<hr />

#### Dev Notes:

- [Docker Alpine Socat](https://github.com/alpine-docker/socat){:target="_blank"} is a good idea to potentially eliminate the need for external socat, however requires potentially setting up Docker Engine. Investigate this.

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
- [Dockermon Remote Host Management](/dockermon/dockermon-remote-hosts)
- [Dockermon Host Launcher - Mac OS](/dockermon/dockermon-host-launcher)
