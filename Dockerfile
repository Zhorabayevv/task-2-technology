FROM node:18.12.1-slim
## Copy source code
COPY ./dist/. /dist
## If you need to change the uid/gid of the user you can use:
## RUN groupmod -g 999 node && usermod -u 999 -g 999 node

RUN chown -R node:node /dist

USER node
## Start the application
CMD ["node", "/dist/owner/server/main.js"]
