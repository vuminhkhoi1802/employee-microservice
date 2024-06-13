# Employee Management System

This project is an Employee Management System built using a microservices architecture. It consists of three main services:

1. **Frontend**: A React application for managing employees.
2. **API Gateway**: A Node.js and Apollo Server application that serves as an intermediary between the frontend and the management service.
3. **Management Service**: A Node.js and gRPC application that contains all the business logic and manages the state.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Development](#development)
- [Docker](#docker)
- [Deployment](#deployment)
- [Usage](#usage)

## Project Structure

```
employee-management-system/
├── employee-management-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
├── employee-management-api-gateway/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
├── employee-management-service/
│   ├── src/
│   │   ├── models/
│   │   │   └── employee.ts
│   │   ├── server.ts
│   │   ├── employee.proto
│   ├── package.json
│   ├── package-lock.json
│   └── Dockerfile
└── docker-compose.yml
```

## Prerequisites

- Node.js (>=18.x)
- Docker and Docker Compose

## Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

## Docker (just build and run this one with docker. It's all setup properly)

### Build and Run with Docker Compose

Build and start all services using Docker Compose:

```bash
docker-compose up --build
```

This will start all services and the PostgreSQL database. The frontend will be available at `http://localhost:3000`, the API Gateway at `http://localhost:4000/graphql`, and the gRPC server at `http://localhost:50051`.

## Usage

### Frontend

- Open the frontend application in your browser.
- Use the interface to view, add, update, and delete employees.

### API Gateway

- The API Gateway provides a GraphQL interface at `http://localhost:4000/graphql`.
- Use the GraphQL playground to test queries and mutations.

### Management Service

- The Management Service exposes gRPC endpoints for employee management.
- Use a gRPC client to test the endpoints.

### Visual Evidence

1. Frontend:
[Imgur](https://imgur.com/NvluBvS)
2. Backend GraphQL:
[Imgur](https://imgur.com/r0hY1tK)

## License

This project is licensed under the MIT License.
