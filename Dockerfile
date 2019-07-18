# FROM node:latest
FROM docker-registry.default.svc:5000/openshift/nodejs@sha256:089f59c57fcb1629d589333f726663496ac98fd49f98bbb1e4cf5f2483e84da7
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm config set proxy http://10.75.28.11:2000
RUN npm config set https-proxy http://10.75.28.11:2000

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]
