FROM node:23-alpine AS base
#Install pnpm package manager
RUN npm i -g pnpm@latest

# Install dependencies
FROM base AS dependencies

# Create app directory
WORKDIR /app
# copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./
# install dependencies
RUN pnpm install

#create nueva imagen build
FROM base AS build
# Create app directory
WORKDIR /app
# copy source code
COPY . .
# copy node_modules from dependencies
COPY --from=dependencies /app/node_modules ./node_modules
# create build
RUN pnpm build
# eliminar dependencias de desarrollo
RUN pnpm prune --prod

# Create final image for despliegue(deploy)
FROM node:23-alpine AS deploy
# Create app directory
WORKDIR /app
# copy node_modules from dependencies
COPY --from=build /app/dist ./dist
#COPY --from=build /app/tmp ./tmp
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Expose the port the app runs in
EXPOSE 5000
CMD [ "node","dist/apps/project_nest-js/main.js"]