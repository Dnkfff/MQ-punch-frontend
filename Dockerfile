FROM node:14.15-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY . .

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start"]
