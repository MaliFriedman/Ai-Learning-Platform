# Step 1 – Build the TypeScript code
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build


# Step 2 – Run the built code in production mode
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/server.js"]
