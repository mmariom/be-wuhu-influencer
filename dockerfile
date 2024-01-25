# Stage 1: Build the application
FROM node:14 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Run the application
FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production

EXPOSE 3000
CMD ["node", "dist/main"]
