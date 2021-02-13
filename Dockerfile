FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install pm2 -g

COPY . .

EXPOSE 3000

CMD ["node", "bin/www.js"]
