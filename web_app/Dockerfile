FROM node:20 AS builder

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:20 AS production

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3009
ENV HOSTNAME=0.0.0.0

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG INTERNAL_API_URL
ENV INTERNAL_API_URL=$INTERNAL_API_URL

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 3009

USER node
CMD ["node", "server.js"]