FROM node:21-alpine AS base

RUN npm i -g pnpm

FROM base AS dependency

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

FROM base AS build 

WORKDIR /app

COPY . .

COPY --from=dependency /app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

FROM node:21-alpine AS deploy

WORKDIR /app

RUN npm i -g pnpm

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

EXPOSE 8080

CMD ["pnpm", "start"]