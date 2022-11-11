ARG NODE_VERSION=16-alpine

# Build stage
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
ADD . /app/
RUN npm i
RUN npm run build

# Run stage
FROM node:${NODE_VERSION}
WORKDIR /app
COPY --from=builder /app/.nuxt .nuxt
COPY --from=builder /app/.output .output
COPY --from=builder /app/package.json .
EXPOSE 3000
CMD npm run preview
