FROM node:23-slim AS base

WORKDIR /home/node/app


#------------------------------------------------
# Separate dev stage with nodemon and different CMD
FROM base AS dev
RUN --mount=type=cache,target=/home/node/app/.npm \
  npm set cache /home/node/app/.npm

# Copy only necessary files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Then copy everything else, excluding node_modules
COPY . .
CMD ["npm", "run", "dev"]

#------------------------------------------------
# Build stage
FROM base AS build
RUN --mount=type=cache,target=/home/node/app/.npm \
  npm set cache /home/node/app/.npm && \
  npm ci
COPY . .
RUN npm run build

RUN ls -la /home/node/app  

#-------------------------------------------------
FROM base AS production
ENV NODE_ENV=production
USER node
COPY --from=build --chown=node:node /home/node/app/.next/ ./.next/
COPY --from=build --chown=node:node /home/node/app/public ./public
EXPOSE 5003
CMD [ "npm", "start" ]
