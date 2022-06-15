FROM node:18-alpine
RUN apk --update add postgresql-client

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm i -g typeorm ts-node

RUN npm install glob rimraf

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 5000
