# Build Layer
FROM node:23-alpine AS development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli*.json ./
# INSTALA  LAS MISMAS LIBRERIAS  Y VERSION
RUN npm ci

COPY src/ src/

RUN npm run build

# Runtime (production) Layer
FROM node:23-alpine AS production

WORKDIR /app

# copy depndencias files
COPY package*.json ./

# Install runtime dependecies (whitout dev/test dependencias)
RUN npm ci --omit=dev

# Copy production build
COPY --from=development /app/dist ./dist

# Expose application port
EXPOSE 5000

# start application
CMD [ "node","dist/main.js" ]