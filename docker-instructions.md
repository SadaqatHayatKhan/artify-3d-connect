
# Docker Instructions for Artify 3D

## Building and Pushing to Docker Hub

1. **Build the Docker image**:
```bash
docker build -t your-dockerhub-username/artify3d:latest .
```

2. **Login to Docker Hub**:
```bash
docker login
```

3. **Push the image to Docker Hub**:
```bash
docker push your-dockerhub-username/artify3d:latest
```

## Running with Docker Compose

1. **Start the application**:
```bash
docker-compose up -d
```

2. **Access the application**:
   - Open your browser and go to: http://localhost:8080

3. **Stopping the application**:
```bash
docker-compose down
```

## Checking Application Details

### Checking Container Status
```bash
docker-compose ps
```

### Checking Container Logs
```bash
# For the web application:
docker-compose logs app

# For the database:
docker-compose logs db

# Follow logs in real-time:
docker-compose logs -f
```

### Accessing the Postgres Database

To check database details:

```bash
docker-compose exec db psql -U postgres

# Once inside psql:
\l     # List databases
\c postgres    # Connect to the postgres database
\dt    # List tables
```

### Volumes and Persistence

The Postgres data is stored in a named volume `postgres_data`. This ensures your data remains persistent even if the containers are removed.

To check volumes:
```bash
docker volume ls
```

### Network Information
```bash
docker network ls
docker network inspect artify-network
```
