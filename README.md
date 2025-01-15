# Nest-RabbitMQ-Setup

## 📚 Architecture Overview

### 🔷 Service-A
**Purpose**: Handles API requests, fetches data from an external API, stores it in MongoDB, logs metrics in Redis, and publishes events to RabbitMQ for inter-service communication.

#### Endpoints:

1. **GET /search**
   - 🔍 **Purpose**: Searches for stored data using filters like `userId`, `title`, and `id`.
   - ⚙️ **How it works**:
     - Queries MongoDB with efficient indexes for filtering.
     - Returns the matched results.

2. **GET /metrics/log**
   - 🔍 **Purpose**: Retrieves metrics logged in Redis TimeSeries.
   - ⚙️ **How it works**:
     - Fetches TimeSeries data from Redis for the provided key.

3. **POST /public-api/fetch**
   - 🔍 **Purpose**: Fetches data from an external API, stores it in MongoDB, and logs execution metrics in Redis.
   - ⚙️ **How it works**:
     - Calls an external API.
     - Stores the result in MongoDB.
     - Logs fetch time in Redis.
     - Publishes an event to RabbitMQ for further processing by **Service-B**.

---

### 🔷 Service-B
**Purpose**: Listens to events from RabbitMQ, processes the events, logs them in MongoDB, and provides APIs to query the logs.

#### Endpoints:

1. **GET /logs**
   - 🔍 **Purpose**: Retrieves logs stored in MongoDB by a specified date range.
   - ⚙️ **How it works**:
     - Filters logs by the `receivedAt` timestamp.
     - Returns sorted results.

---

## 🔑 Key Features

### 🟠 RabbitMQ Integration
- **Purpose**: Enables communication between Service-A and Service-B.
- ⚙️ **How it works**:
  - **Service-A** publishes events to the `events.fetch` queue.
  - **Service-B** listens for events from this queue and processes them.

### 🟢 MongoDB Integration
- **Purpose**: Stores and retrieves data.
- **Indexes**:
  - **Service-A**:
    - `data.userId`: Single field index for efficient filtering by `userId`.
    - `data.title`: Text index for case-insensitive partial matching on `title`.
    - `data.id`: Single field index for filtering by `id`.
  - **Service-B**:
    - `receivedAt`: Index for efficient querying by date range.

### 🔵 Redis Integration
- **Purpose**: Stores metrics and auxiliary data.
- **Keys Used**:
  - **Service-A**:
    - `last_fetch_time`: Tracks the last time data was fetched.
    - **TimeSeries Metrics**:
      - Format: `<key>:duration`.


## ⚡️ Installation & Setup

### 🛠 Prerequisites
1. Ensure the following are installed on your system:
   - Docker and Docker Compose
   - Node.js (v18 or higher)
2. Clone the repository:
   ```bash
   git clone git@github.com:ZavenPetrosyan/Nest-RabbitMQ-Setup.git
   cd Nest-RabbitMQ-Setup
3. Ensure you have the .env files properly configured for both services

### 🐳 Running the Project with Docker Compose
 1. Navigate to the root directory of the project.
 2. docker-compose up --build
 3. Verify that the containers for mongo, redis, rabbitmq, service-a, and service-b are running:
    bash
    Copy
    Edit (docker ps)
 
    ## 🔍 Verifying Services
    1. Service-A
    Swagger API Documentation: http://localhost:3000/api
        **Example Endpoints**:
        /search
        /metrics/log
        /public-api/fetch

    2. Service-B
    Swagger API Documentation: http://localhost:3001/api
        **Example Endpoints**:
        /logs

    ## 🔄 RabbitMQ Configuration
    1. RabbitMQ queues and exchanges should be created automatically when the services are running.
    2. Verify the RabbitMQ UI at http://localhost:15672 (default credentials: guest/guest).

    ## 🧹 Cleanup
    1. To stop all services and remove containers, run: docker-compose down
    2. To remove the containers, volumes, and networks, run: docker-compose down --volumes
