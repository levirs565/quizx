FROM node:16 as base

FROM base AS builder
WORKDIR /app
COPY ["package.json", "yarn.lock", ".yarnrc.yml", "./"]
COPY "server/package.json" "./server/"
COPY "client/package.json" "./client/"
COPY ".yarn" "./.yarn"
RUN yarn install
COPY "client" "./client/"
RUN yarn workspace @quizx/client build
COPY "server" "./server/"
RUN yarn workspace @quizx/server build
RUN yarn workspaces focus --production @quizx/server

FROM base as runner
WORKDIR /app
COPY --from=builder "app/client/dist" "client/dist"
COPY --from=builder "app/server/dist" "server/dist"
COPY --from=builder "app/node_modules" "node_modules"
WORKDIR /app/server
CMD ["node", "./dist/main.js"]
