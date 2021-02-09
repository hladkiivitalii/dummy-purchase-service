FROM node:12
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "bin/www.js"]
