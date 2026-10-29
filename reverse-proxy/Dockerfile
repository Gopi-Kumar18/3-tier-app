# Draft reference for the Reverse-Proxy EC2 — see templates/default.conf.template
# for what's still undecided before this is actually deployed there.
FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY templates/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ || exit 1
