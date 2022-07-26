FROM node

WORKDIR /vinchecker

COPY . /vinchecker

RUN npm i
