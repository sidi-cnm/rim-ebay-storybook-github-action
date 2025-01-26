# Étape de construction
FROM docker.io/oven/bun:1.0-slim AS builder

WORKDIR /app

# Copie des fichiers de dépendances d'abord pour le cache
COPY package.json bun.lockb ./
COPY prisma ./prisma

# Installation des dépendances
RUN bun install --frozen-lockfile

# Copie du reste du code
COPY . .

# Construction de l'application
RUN bun run build

# Étape finale
FROM oven/bun:1.0-slim

WORKDIR /app

# Copie depuis le builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["bun", "start"]