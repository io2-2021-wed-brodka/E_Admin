FROM nginx

COPY ./ngnix.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY ./target/classes/static/front-app/ ./
