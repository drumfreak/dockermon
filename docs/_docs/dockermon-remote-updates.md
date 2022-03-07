---
permalink: /dockermon-remote-updates/
title: "Dockermon Remote Updates"
toc: false
---
## Dockermon Container Remote Github Updates

When you create a Dockermon container you can enable Github updates and even select a specific branch to launch the backend and frontend from.  By using environment variable in the dockermon container, the startup scripts will update the container's app code and startup scripts with the files contained in [Dockermon App Repo](https://github.com/drumfreak/dockermon-app){:target="_blank"}

## To Enable Github Updates 
(default in the docker-compose.yml):

``` bash
DOCKERMON_ENABLE_GIT_UPDATE=1
DOCKERMON_ENABLE_GIT_BRANCH="main"
```

<div class="content-spacer"></div>

## Github Updates Branch Selection 

``` bash
DOCKERMON_ENABLE_GIT_UPDATE=1
DOCKERMON_ENABLE_GIT_BRANCH="some_branch"
```

<div class="content-spacer"></div>

## What's happening here?

The process allows the automatic updates to the latest code. The code in the repos above is production builds of the Nest backend and Next.js frontend.

The dockermon container script in [/app/dockermon-app/start.sh](https://github.com/drumfreak/dockermon-app/blob/main/start.sh){:target="_blank"} specifically does this:

``` bash
#/bin/sh
if [ $DOCKERMON_ENABLE_GIT_UPDATE ]
then
    cd /app
    if [ ! -d "/app/dockermon-app/.git" ]
    then
        git clone https://github.com/drumfreak/dockermon-app.git
    fi

    cd dockermon-app

    if [ $DOCKERMON_ENABLE_GIT_BRANCH ]
    then
        git checkout $DOCKERMON_ENABLE_GIT_BRANCH
    fi
    git pull
fi

cd /app
/app/dockermon-app/app-start.sh
... resume normal launch

```


If you are concerned about security of remote updates, you may update your `docker-compose.yml` and modifiy ENV section as follows:


## To Disable github Updates: 

```bash
DOCKERMON_ENABLE_GIT_UPDATE=0
```

<hr />

> Beware that there are no notices that updates have occured yet. You may one day boot up and see a whole new interface. Surprise!! At least it's free.

<hr />

### Read More:

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
