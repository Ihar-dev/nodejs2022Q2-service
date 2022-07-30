FROM node:lts-alpine As development

WORKDIR /app

COPY . .

RUN npm install --force

EXPOSE $PORT

USER node
