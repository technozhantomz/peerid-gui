FROM node:12

WORKDIR /peerid-gui

ARG node_env='development'
ENV NODE_ENV=$node_env

COPY ./package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 8082

ENTRYPOINT ["/peerid-gui/scripts/replace_vars.sh"]

CMD ["npm", "run", "start"]
