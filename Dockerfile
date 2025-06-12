FROM node:23-alpine 

RUN npm install -g pnpm 

WORKDIR /app

RUN mkdir -p /app/log_files


COPY package.json pnpm-lock.yaml ./


RUN pnpm install --frozen-lockfile

COPY . .


# Expose port
EXPOSE 8000

# Start the application in development mode
CMD ["pnpm", "run", "start:dev"]