# Single image for both reference services. The command argument selects which one
# runs, so the image stays small and the two services cannot drift apart.
FROM node:24-alpine AS deps

WORKDIR /app
COPY package.json ./
# The services are dependency free; nothing is installed here on purpose.

FROM node:24-alpine AS runtime

ENV NODE_ENV=production \
    PORT=8787 \
    HOST=0.0.0.0 \
    SYNC_DATA_DIR=/data/sync \
    CMS_PORT=8788 \
    CMS_DATA_DIR=/data/cms

WORKDIR /app

COPY --from=deps /app/package.json ./package.json
COPY server ./server
COPY scripts ./scripts
COPY public/cms ./public/cms

RUN mkdir -p /data/sync /data/cms && chown -R node:node /data /app
USER node
VOLUME ["/data"]

EXPOSE 8787 8788

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "const p=process.env.PORT||8787;const c=process.env.CMS_PORT||8788;Promise.all([fetch('http://127.0.0.1:'+p+'/health').then(r=>r.ok),fetch('http://127.0.0.1:'+c+'/health').then(r=>r.ok)]).then(v=>process.exit(v.every(Boolean)?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["node"]
CMD ["server/progressSyncServer.mjs"]
