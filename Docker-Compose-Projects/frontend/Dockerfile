# Stage 1: build the static bundle.
# node:21-alpine3.17 was never an LTS release and is already EOL — use
# the current Node LTS line instead.
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve with Nginx, as a non-root user (nginx-unprivileged
# listens on 8080 instead of 80 by default, running as the `nginx`
# user rather than root).
FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY --from=build --chown=nginx:nginx /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Runs automatically before nginx starts (the base image's entrypoint
# sources every /docker-entrypoint.d/*.sh script). Rewrites
# env-config.js from env-config.template.js using the container's
# real environment, so the API base URL is injected at container
# start, not baked into the image at build time.
COPY docker-entrypoint-env.sh /docker-entrypoint.d/30-env-config.sh
USER root
RUN chmod +x /docker-entrypoint.d/30-env-config.sh
USER nginx

EXPOSE 8080

# 127.0.0.1, not localhost — nginx's `listen 8080;` is IPv4-only, and
# `localhost` can resolve to ::1 first, giving a false unhealthy status.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ || exit 1
