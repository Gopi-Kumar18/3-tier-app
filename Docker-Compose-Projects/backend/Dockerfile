# node:14 is EOL and receives no security patches — moved to the
# current Node LTS line.
FROM node:22-alpine

WORKDIR /app

# Install only production deps (devDependencies like jest/supertest,
# used by the Jenkins Test stage, never ship in the runtime image).
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Alpine images run as root by default; drop to an unprivileged user
# for the actual process.
RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 3500

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3500/health || exit 1

CMD ["node", "server.js"]
