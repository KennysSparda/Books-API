FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY src/ .

EXPOSE 3000

CMD ["node", "api.js"]
