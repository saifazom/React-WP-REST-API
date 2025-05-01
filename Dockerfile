FROM node:20-slim AS development-dependencies-env
COPY . /app
WORKDIR /app
# Remove existing node_modules and package-lock.json if they exist
RUN rm -rf node_modules package-lock.json
# Install dependencies with platform-specific binaries
RUN npm install

FROM node:20-slim AS production-dependencies-env
COPY ./package.json /app/
WORKDIR /app
# Clean install production dependencies
RUN npm install --omit=dev

FROM node:20-slim AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-slim
COPY ./package.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]