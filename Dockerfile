FROM node:14.15.0
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 8001
ENTRYPOINT [ "npm", "start" ]