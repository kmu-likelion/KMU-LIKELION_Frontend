FROM node:10.16.1 as build

RUN npm install -g yarn

# 작업 폴더를 만들고 npm 설치
WORKDIR /app/frontend

COPY ./frontend-react/package.json /app/frontend
RUN yarn

COPY ./frontend-react /app/frontend
RUN yarn build

RUN yarn global add serve
