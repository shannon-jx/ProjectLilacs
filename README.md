# README - Project Lilacs 
To run the application:
````
# Build the docker image
$ docker build -t reminder .

# Run a container
$ docker run -d -p 5000:5000 --name reminder --restart unless-stopped -e TELEGRAM_TOKEN=xxx reminder
````
