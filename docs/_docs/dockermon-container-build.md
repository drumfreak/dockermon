---
permalink: /dockermon-container-build/
title: "Docker Image Build Process"
toc: false
---
<h2 align="center">
 Dockermon Container / Image Build Details
</h2>

The Dockermon Image was created from the mysql/debian-8 image. It was modified to add packages such as git, node, redis, vim, etc. 

The image was built, flattened, and placed on Docker Hub as the engine for this project.

<hr />

### Container Environment Vars

The folling Environment Vars may be set, but not recommended you change them at this stage of the project development.


| Var      |  Use  | Default Value |
| ----------- | ----------- |  ----------- |
| DOCKERMON_CURRENT_ENV | for internal | dev |
| DOCKERMON_FRONTEND_PORT | for internal | 3800 |
| DOCKERMON_BACKEND_API_PORT | for internal | 3810 |
| DOCKERMON_BACKEND_WS_PORT | for internal | 3811 |
| DOCKERMON_HOST_LAUNCHER_PORT | for internal | 3801 |
| DOCKERMON_WORKER_HOST_ADDRESS | for internal | host.docker.internal |
| DOCKERMON_WORKER_HTTP_PORT | for internal | 3820 | 
| DOCKERMON_ENABLE_GIT_UPDATE | for updaes | 1 | 
| DOCKERMON_ENABLE_GIT_BRANCH | for updaes | main | 


<hr />

### Container Image and Volume Sizes

The following are estimated file sizes without data in the database as of version 0.1 initial release.

| Disk      | Size  |
| ----------- | ----------- |
| Base Image `webfreakeric/dockermon` | 701.77 MB |
| Backend `node_modules` Volume | 94.69 MB |
| Frontend `node_modules` Volume | 376.4 MB |
| MySQL Data `dockermon_db-data` | Volume | 0 MB |

<b>Total Estimated New Install: 1.1Gb Disk space</b>

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
