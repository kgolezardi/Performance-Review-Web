FROM nginx:1.16-alpine

COPY ./configs/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build/ /usr/share/nginx/html

EXPOSE 80
