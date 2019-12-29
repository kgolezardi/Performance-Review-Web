FROM node:12 as build-stage
LABEL stage=intermediate

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN CI=true yarn --pure-lockfile

COPY ./ /usr/src/app
RUN yarn build
# Copy build artifacts

FROM nginx:1.15 as server

COPY --from=build-stage /usr/src/app/build/ /usr/share/nginx/html
COPY ./configs/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

