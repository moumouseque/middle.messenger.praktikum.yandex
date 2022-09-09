FROM node:14.20.0-alpine3.16
WORKDIR /var/www
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm","start"]
