FROM node:14 AS development
WORKDIR /usr/src/server
COPY *.json ./
RUN npm ci
COPY ./src ./src
RUN npm run build
FROM node:14-slim as production
WORKDIR /usr/server
COPY --from=development /usr/src/server/package*.json ./
RUN npm ci --only=production
COPY --from=development /usr/src/server/dist ./dist
CMD ["node", "dist/main"]