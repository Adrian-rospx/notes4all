# syntax=docker/dockerfile:1
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci --omit-dev
RUN touch notes.db

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
