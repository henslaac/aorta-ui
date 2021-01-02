# stage 1
FROM node:alpine AS web-ui-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
RUN npm run build

# stage 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=web-ui-build /app/dist/aorta-ui /usr/share/nginx/html
EXPOSE 80
