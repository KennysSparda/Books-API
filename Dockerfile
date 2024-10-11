FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY src/ .

EXPOSE 8080

CMD ["node", "api.js"]
