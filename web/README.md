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

## Run Docker

```
docker run -it -p 4000:3000 artist-info
```

## Run Kubernetes
 
```
kubectl apply -f deployment.yaml
```
- `:latest` means that we usually have `imagePullPolicy: Always` set, meaning that image is always pulled before run
- usually this is not ideal, better to push updates with versioning (ie. v1.2.7)

