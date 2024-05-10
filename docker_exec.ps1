function docker-compose-up { 
    docker-compose down;
    docker-compose up -d
}
docker-compose-up