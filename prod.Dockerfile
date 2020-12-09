FROM node:12 as build

WORKDIR /peerid-gui

ARG node_env=''
ENV NODE_ENV=$node_env

COPY ./package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

FROM nginx:1.18.0
  
RUN rm /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
RUN mkdir /peerid-gui

COPY --from=build /peerid-gui/build /peerid-gui/
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY nginx/docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
