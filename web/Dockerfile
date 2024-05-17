# set the base image to build from
# react runs on node
FROM node:alpine

# set the working directory
# this is the working folder where the app will run inside the container
WORKDIR /app

# copy package files
COPY package.json ./
COPY package-lock.json ./

# install dependencies in the Docker app
RUN npm install

# copy all project files to docker app directory
COPY ./ ./

# run application inside docker container
CMD ["npm" , "start"]
