FROM nginx:1.20-alpine
WORKDIR /usr/share/nginx/html
COPY ./app .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]