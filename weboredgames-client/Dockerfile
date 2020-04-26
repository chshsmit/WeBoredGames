FROM node:12.2.0-alpine

WORKDIR /app
COPY package.json /app/package.json
RUN npm config set unsafe-perm true && npm install

COPY public /app/public
COPY src /app/src
COPY jsconfig.json /app/jsconfig.json

CMD ["npm", "start"]
