# ─── Stage 1: Build React frontend ───────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install --frozen-lockfile

COPY client/ .
RUN npm run build

# ─── Stage 2: Express production server ───────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Install server deps
COPY server/package*.json ./server/
RUN cd server && npm install --frozen-lockfile --omit=dev

# Copy server source
COPY server/ ./server/

# Copy built React app
COPY --from=builder /app/client/dist ./client/dist

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "server/index.js"]
