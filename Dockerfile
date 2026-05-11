# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=24.13.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app


################################################################################
# Create a stage for development workflows (compose + devcontainer).
FROM base as dev

# Use development mode and install all dependencies once in the image.
ENV NODE_ENV=development

# Install git for version control in devcontainer.
RUN apk add --no-cache git

COPY package.json package-lock.json ./
RUN npm ci

# Expose Vite dev server port.
EXPOSE 5173

# Run Vite in container-friendly mode.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]


################################################################################
# Create a stage for installing production dependencies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM nginx:1.29.1-alpine as final

# Copy the built application into the Nginx web root.
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Use a custom config for SPA routing and a non-root port.
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port that the application listens on.
EXPOSE 8080

# Run Nginx in the foreground.
CMD ["nginx", "-g", "daemon off;"]
