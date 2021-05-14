FROM node:14

WORKDIR /usr

COPY . .

RUN npm install

EXPOSE 4201

CMD ["npm", "start"]

