FROM node:20-alpine 

# RUN npm install -g pnpm 

WORKDIR /app

RUN mkdir -p /app/log_files


COPY package.json pnpm-lock.yaml ./


RUN npm install --frozen-lockfile

COPY . .


# Expose port
EXPOSE 8000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]




# docker-compose -f docker-compose.prod.yml logs eventoasis

#  status for all containers
# docker-compose -f docker-compose.prod.yml ps

#  docker-compose -f docker-compose.prod.yml logs redis

#  docker-compose -f docker-compose.prod.yml logs event-management-db
