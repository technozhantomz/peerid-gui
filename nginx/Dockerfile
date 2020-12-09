FROM nginx:1.18.0

RUN rm /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf 

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
