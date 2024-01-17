# alpine is the most basic version of an image
FROM node:14-alpine

WORKDIR /usr/app

# Using cahche more efficiently
COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
