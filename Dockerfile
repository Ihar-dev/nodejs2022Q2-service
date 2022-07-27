FROM node:lts-alpine As development

WORKDIR /app

COPY . .

RUN npm install

EXPOSE $PORT

RUN npm run prisma:generate

USER node
