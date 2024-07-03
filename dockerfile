FROM node:20 AS build

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/default.conf /etc/nginx/conf.d

# 로컬 서버의 SSL 인증서 파일 복사
COPY /etc/ssl/mydomain.com/certificate.crt /etc/ssl/certificates/certificate.crt
COPY /etc/ssl/mydomain.com/private.key /etc/ssl/certificates/private.key

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443
CMD [ "nginx", "-g", "daemon off;" ]
