---
permalink: /dockermon-features/
title: "Dockermon Features"
toc: false
---

## Dockermon Features

Dockermon comes packed with features. 

### Monitoring
Utilizing the Bull Scheduling and Redis to keep track of job scheduling, separate workers run to monitor the hosts connected to Dockermon. Every 30 seconds the containers that are running are tracked for CPU, Memory, Network In/Out, Disk Read / Write, and various other stats.  This is similar to running `docker container inspect` except all of the details are logged into MySQL on the backend and statistical reports can be obtained.

<div class="content-spacer-sm"></div>

### Charts and Graphs
Using ChartJS and MySQL storage, we are able to chart out the vitals of the container. 

![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-charts.png?raw=true)

<div class="content-spacer-sm"></div>


### 1 Second Profiler
The 1 Second Profiler connects to the Docker Engine API and reads live stats from the containers and then logs them into the database as a profile. This is useful for benchmarking your builds, tracking and monitoring them.  Profilings can be reviewed, replayed and exported.

<div class="content-spacer-sm"></div>


### Activity Logs
Dockermon logs when events are received from the Docker Engine. Such as container start, stop, pause, create, kill, remove.  Any events are logged to their related Containers, Images, Volumes, Networks, Hosts, etc. 

![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-activity-logs.png?raw=true)

<div class="content-spacer-sm"></div>

## Docker Management
Dockermon has a full blown React / Next JS with PrimeReact loaded full of smooth components for you to manage Docker with.


### Container Management
- Start, Stop, Pause, Resume, Kill, Remove, Create, Rename containers.
- View disk usage by volumes.
- View / Join / Disconnect from networks
- View and Monitor Container Processes
- View and Monitor Container Logs
- Attach to local Docker Containers via Terminal
- Launch Finder and VS Code to Mounted directories
- So much more!

![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-control-menu.png?raw=true)

### Image Management
- Create images from containers
- Search Docker Hub
- Pull images from Docker Hub
- Remove Images
- More image management coming soon.

![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-create-image.png?raw=true)

### Volume Management
- View volume details
- Create new volumes
- Delete volumes

### Network Management
- Create networks, bridges, etc
- Add / Remove containers from networks
- Configure network IPv4 and IPv6 Settings / Gateways, etc.
- Configure DNS

![Dockermon](https://drumfreak.github.io/dockermon/images/dockermon-network-diagram.png?raw=true)

<div class="content-spacer-sm"></div>

## Multi-Host Support
Want to add more docker hosts? Check out the [socat](/dockermon-socat) section and learn more about exposing Docker Engine API and then connect to other hosts on your network or even on the internet (not recommended for production use at this stage).

- Monitor, create and manage containers, volumes, networks, images, etc on remote Docker hosts.

> Note Host Launcher support is not available on remote hosts. (opening Terminal, Finder, VSCode, etc)

<div class="content-spacer-sm"></div>

## Control Center Dashboards
Dockermon is being designed with interactive dashboards so you can quickly control and get a birds eye view of your docker system. 

<div class="content-spacer-sm"></div>

## Customizable Chart Colors / Site Settings
Dockermon has a built in Options Panel for you to customize how CPU, Memory, Disk, Network charts and graphs look. As well, you can control several aspects of your menus and site interactions.  Find the cogg and click it!


More coming.

<div class="content-spacer-sm"></div>

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
