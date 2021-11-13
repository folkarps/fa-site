FROM node:14-alpine as client-install

WORKDIR /client/
COPY ./package*.json ./
RUN npm install && npm cache clean --force

FROM client-install as client-build
COPY ./ ./
RUN npm run build

FROM nginx:alpine as web

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=client-build /client/dist/ /dist/