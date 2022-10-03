FROM node:17-alpine3.14 AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY .yarnrc ./
COPY .npmrc ./
COPY yarn.lock ./
RUN yarn
COPY . ./

ARG BUILD_ENV=production
RUN if [ "$BUILD_ENV" = "uat" ] ; then yarn build:uat; fi;
RUN if [ "$BUILD_ENV" = "staging" ] ; then yarn build:staging; fi;
RUN if [ "$BUILD_ENV" = "production" ] ; then yarn build:production; fi;

COPY ./app.js /app
EXPOSE 80
CMD ["node", "/app/app.js"]