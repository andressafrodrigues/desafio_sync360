function docker-compose-up-rebuild {
    docker-compose down; 
    docker-compose build; 
    docker-compose up -d 
}
docker-compose-up-rebuild