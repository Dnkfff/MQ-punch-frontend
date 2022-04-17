FROM node:16.8-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start"]
