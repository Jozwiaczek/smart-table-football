# stf-api

> 

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/stf-api
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

---

## How To Deploy And Manage MongoDB With Docker

### Download MongoDB Image for Docker
Proceed to download the latest official Docker image for the MongoDB database:
```bash
docker pull mongo
```

List the images in your Docker repository with the following command:
```bash
docker images
```

### Deploy MongoDB Container
Start the Docker container with the run command using the mongo image.
```bash
docker run -it -v $(pwd)/data/db:/data/db -p 27017:27017 --name mongodb -d mongo
```

- `-it` – Provides an interactive shell to the Docker container.
- `-v` – Use this option to attach the data host volume to the /data/db container volume.
- `-p` - Set port for a docker and gateway. The default port number is 27017, but I set it for clarity.
- `-d` – Starts the container as a background process.
- `--name` – Name of the container.

Always check the Docker log to see the chain of events after making changes:

```bash
docker logs mongodb
```

### Start Interactive Docker Terminal to Manage Database
The container is currently running in detached mode. Connect to the container using the interactive terminal instead:

```bash
docker exec -it mongodb bash
```

Start the MongoDB shell by typing `mongo` in the interactive terminal.

### Stopping and Restarting MongoDB Database
The docker stop command is a short and clear command that stops running container instances:

```bash
docker stop mongodb
```

Inspect the list of running Docker containers by typing:
```bash
docker ps -a
```
- `-a` - list all containers, both running and stopped

Containers are started by using the docker start command:
```bash
docker start mongodb
```
