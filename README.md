# Online Judge (OJ) Platform

Online Judge is a web-based platform designed for programming enthusiasts to practice and improve their coding skills by solving programming challenges.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and profile management
- Problem-solving interface with syntax highlighting
- Submission and evaluation of code
- Leaderboard for users based on performance
- Admin panel for managing problems and users
- ...

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/oj.git

2. Navigate to the project directory
    ```bash
    cd oj

3. Start frontend and backend server
    ``` bash
    cd client
    npm install
    npm start

    cd server
    npm install
    npm start
4. Start Docker container and Redis server for queue

# Folder Structure 
oj-platform/
|-- client/              # React frontend application
|-- server/              # Node.js Express backend server
|-- public/              # Static files
|-- README.md            # Project documentation
|-- .env                 # Environment variables
|-- .gitignore           # Git ignore file
|-- package.json         # Server dependencies and scripts
|-- client/package.json  # Client dependencies and scripts
|-- server/package.json  # Server dependencies and scripts
