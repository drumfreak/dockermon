---
permalink: /dockermon-remote-updates/
title: "Dockermon Remote Updates"
toc: false
---
<h2 align="center">
 Dockermon Container Remote Github Updates
</h2>

When you create a Dockermon container you can have Github updates enabled.  By using `DOCKERMON_GITHUB_UPDATES=1` environment variable in the dockermon container, the startup scripts will update the container's app code and startup scripts with the files contained in [Dockermon App Repo](https://github.com/drumfreak/dockermon-app)

The process allows the automatic updates to the latest code. The code in the repos above is production builds of the Nest backend and Next.js frontend.

If you are concerned about security of remote updates, you may update your docker-compose.yml and modifiy the `DOCKERMON_GIT_UPDATES=0` setting.

> Beware that there is no notices that updates have occured yet. You may one day boot up and see a whole new interface. Suprise!! 

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
