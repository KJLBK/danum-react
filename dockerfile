FROM node:20 AS build

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx/default.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html

# SSL 인증서 파일을 추가합니다.
COPY ./certificates/certificate.crt /etc/ssl/certificates/certificate.crt
COPY ./certificates/private.key /etc/ssl/certificates/private.key

EXPOSE 80
EXPOSE 443
CMD [ "nginx", "-g", "daemon off;" ]
