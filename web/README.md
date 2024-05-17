# PERSONAL CHATBOT - FRONT END

# Environment Variables

Firstly create a .env file and populate it with the below.

```bash
REACT_APP_API_URL=http://localhost:5002/
REACT_APP_BASE_URL=http://localhost:3000/
```

# Get running locally

Install dependencies and start up the server

```bash
npm install

npm run start
```

Once the above is complete the front end will be running on port 3000

Ensure you have started up the server.

# Docker and Kubernetes
https://mattermost.com/blog/how-to-deploy-a-react-app-to-kubernetes-using-docker/

## Start Minikube
```
minikube start
```

If Unable to resolve the current Docker CLI context "default": context "default"
```
docker context use default
```

## Run Docker Development

```
docker build -f Dockerfile isabellachen3988/artist-info .
docker push isabellachen3988/artist-info:latest
docker run -it -p 4000:3000 isabellachen3988/artist-info
```

## Run Docker Production
https://mherman.org/blog/dockerizing-a-react-app/

```
docker build -f Dockerfile.prod -t isabellachen3988/artist-info-prod .
docker push isabellachen3988/artist-info-prod:latest
docker run -it --rm -p 1337:80 isabellachen3988/artist-info-prod
```

## Run Kubernetes Development
 
```
kubectl apply -f deployment-dev.yaml
```
- `:latest` means that we usually have `imagePullPolicy: Always` set, meaning that image is always pulled before run
- usually this is not ideal, better to push updates with versioning (ie. v1.2.7)

## Run Kubernetes Production
```
kubectl apply -f deployment-prod.yaml
```
