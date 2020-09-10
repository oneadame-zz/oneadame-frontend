FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# ECR URI removed, nginx-based container with config change
# for HTML5 history mode routing
FROM ... as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
# daemon off so process runs in foreground
CMD ["nginx", "-g", "daemon off;"]