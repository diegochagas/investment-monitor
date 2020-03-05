FROM node:alpine as builder
COPY package.json ./

RUN apk update && apk --no-cache add python yarn
RUN yarn config set strict-ssl false
RUN yarn add firebase-admin@^5.5.0 @firebase/app-types@0.x mongoose@5.4.15 --ignore-scripts
RUN yarn

FROM node:8
WORKDIR /usr/src/app
COPY --from=builder node_modules ./node_modules
RUN npm i -g typescript
COPY . .
RUN node build.js --stage=docker
RUN tsc --version
EXPOSE 3000

CMD ["npm", "run", "start:docker"]
