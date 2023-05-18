FROM node:17-alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "run", "start:prod"]
