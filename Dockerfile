FROM node:alpine3.19 as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

RUN ls -l /app


FROM nginx:1.27.2-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf *

RUN ls -l /app/build
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx","-g","daemon off;" ]