FROM node:alpine3.19 as build

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN echo "Files copied:" && ls -l /app  # List all files
RUN npm run build && echo "Build succeeded" || echo "Build failed"

RUN ls -l /app/dist || ls -l /app/build


FROM nginx:1.27.2-alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf *


COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx","-g","daemon off;" ]