FROM node:18.16.0 AS build
RUN apt-get update && \
    apt-get install -y --no-install-recommends dumb-init tzdata

USER node
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app/

RUN npm ci

FROM node:18.16.0-bullseye-slim
ENV TZ Asia/Singapore
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node

WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app /usr/src/app

EXPOSE 5000
WORKDIR /usr/src/app
CMD ["dumb-init", "npm", "start"]
