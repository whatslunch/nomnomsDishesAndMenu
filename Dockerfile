FROM node:11
RUN mkdir -p /src/app
WORKDIR /src/app
COPY package*.json /src/app
RUN npm install
COPY . /src/app
EXPOSE 2000
CMD ["npm", "start"]