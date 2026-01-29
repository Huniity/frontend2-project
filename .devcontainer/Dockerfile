FROM node:20-slim

# Install OS dependencies
RUN apt-get update && apt-get install -y \
  openssl \
  git \
  curl \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Enable latest npm (optional but fine)
RUN npm install -g npm@latest

# Prisma needs openssl
ENV PRISMA_CLI_BINARY_TARGETS=linux-arm64-openssl-3.0.x,linux-x64-openssl-3.0.x

# Keep container alive for devcontainer
CMD ["sleep", "infinity"]
