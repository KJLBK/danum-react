# Dockerfile
FROM node:20 AS build

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build
