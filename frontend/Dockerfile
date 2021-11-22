FROM node:16.13.0 as build-stage
ARG AUTH0_CLIENTID="Please set the AUTH0_CLIENTID build ARG"
WORKDIR /app
RUN echo "VUE_APP_AUTH0_CLIENTID=$AUTH0_CLIENTID" | tee .env.local
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
