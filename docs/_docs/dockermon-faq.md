
---
layout: single
title: "Dockermon FAQ"
permalink: /dockermon-faq/
breadcrumbs: false
author_profile: true
excerpt: "Dockermon - Manage and Monitor Docker - FAQ"
layouts_gallery:
  - url: /images/dockermon-preview.png
    image_path: /images/dockermon-preview.png
    alt: "Dockermon"
last_modified_at: 2022-03-03T10:23:16-04:00
toc: true
sidebar:
    nav: "docs"
---

# Dockermon - FAQ

From time to time, this may be updated. Or frequently, if questions are asked frequently enough.

#### Something is broken, what do I do?

Typically that is what we hear as Software Developers. Please help us out and explain what it is that is broken, why you believe it's broken and what it should do. That helps us to help you.

### Dockermon isn't loading. 

First, did you change anything from the standard setup? If so, delete everything, start over and try again. 

- Delete the Dockermon container from Docker.
- Remove the dockermon_node_modules-fe and *_node_modules-be volumes.
- If you want to try and preserve your MySQL data, Dockermon should be able to connect to that volume and you won't lose any data.
- Delete the webfreakeric/dockermon-monitor image.
- You can optionally do a `docker image prune` now, but it will remove any images you may have that aren't being actively used.
- Remove the dockermon source code directory you originally downloaded.
- Go back to Step 1 of the [README](http://drumfreak.github.io/dockermon) and start again. Do not modify any settings and attempt to rebuild. 
  
  If all goes well, you'll be back up and running with your existing data. If for any reason you want to reset MySQL or are possibly having issues related to it, you can start the steps above again and delete the `dockermon_db-data` volume. 


#### My Container was created and Dockermon lost the data.

This is a funny thing right? Docker re-creates the containers and their ID changes. Dockermon marks those containers as `dead` in the database and soft deletes them. They then get re-created under a new Id.  That's why currently the site acts strange when this shift happens. 

This is being reviewed as a way to join these orphaned containers and preserve the stats, but for now, they will remain orphans and ghosts in the database. Don't worry, a cronjob will be written later to fix this.

#### 



### Read More

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
