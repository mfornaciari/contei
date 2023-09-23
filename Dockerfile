FROM node:20.7.0-alpine3.17
WORKDIR /app

ARG USER=1000
RUN addgroup -S $USER && adduser -S $USER -G $USER
USER $USER
