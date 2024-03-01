FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev # Avoid installing dev dependencies.
COPY . .

CMD ["npm", "start"]
