#!/bin/sh
# Generates env-config.js from env-config.template.js using whatever
# API_BASE_URL was passed to `docker run` / docker-compose at deploy
# time. Keeps the backend URL out of the built JS bundle entirely —
# it is resolved once, at container start, per environment.
set -eu

: "${API_BASE_URL:=}"

TEMPLATE=/usr/share/nginx/html/env-config.template.js
OUTPUT=/usr/share/nginx/html/env-config.js

if [ -f "$TEMPLATE" ]; then
  sed "s|__API_BASE_URL__|${API_BASE_URL}|g" "$TEMPLATE" > "$OUTPUT"
fi
