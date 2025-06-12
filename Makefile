build:
    docker compose -f docker-compose.prod.yml up --build -d --remove-orphans

up:
    docker compose -f docker-compose.prod.yml up -d

down:
    
    

down-v:
    docker compose -f docker-compose.prod.yml down -v

network-create:
    docker network create event_management_network