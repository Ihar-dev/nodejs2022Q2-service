FROM node:lts-alpine as build
ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm install --production --silent
FROM gcr.io/distroless/nodejs
COPY --from=build /app /
EXPOSE $PORT
CMD ["dist/main.js"]