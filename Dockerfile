FROM nginx:alpine
COPY ./dist/* /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

RUN adduser -D myuser
USER myuser

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
