FROM node:22.13.0

WORKDIR /app

COPY . .

WORKDIR /app/Frontend

EXPOSE 5173

RUN npm install


CMD [ "npm","run","dev" ]