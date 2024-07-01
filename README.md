# Project Manager

Project Manager System is an application designed to assist in project production and proficiency, helping you achieve your objectives efficiently.

## API Documentation
<img href="![image](https://github.com/matheusmartinsviana/project-manager/assets/146596878/d5edde68-9dca-4e29-8fee-8f565b785fa9)" height=100 width=100/>
<a href="https://app.swaggerhub.com/apis-docs/MATHEUSMVIANA/project-manager/1.0.0" target="_blank">Project Manager API developed with Swagger</a> <br>
Swagger is an application that has many tools for developers, and one of the tools is that you can create API documentation

## Table of Contents

- [Relationships](#relationships)
- [Requirements](#requirements)
- [Entities](#entities)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)

## Relationships

![Relationships - Project Manager](https://github.com/matheusmartinsviana/project-manager/assets/146596878/7c9b2c21-5261-4f86-8d0b-60af12c7c0c3)

[Download Relationships Diagram](https://github.com/user-attachments/files/15796260/Relationships.-.Project.Manager.pdf)

## Requirements

Clarifying the project requirements is crucial for quality and accuracy in development.

[Download Project Requirements](https://github.com/user-attachments/files/15849351/Project.Manager.Requirements.pdf)

## Entities

### User
- ID (unique)
- Name
- Email
- Password (hash)
- Creation Date

### Project
- ID (unique)
- Name
- Description
- Creation Date
- User ID (relationship with the User entity)

### Task
- ID (unique)
- Title
- Description
- Creation date
- Completion date (optional)
- Status (pending, in progress, completed)
- Project ID (relationship with the Project entity)

## Technologies Used

- **Node.js**
- **Express.js**
- **JWT (JSON Web Token)**
- **MySQL**
- **Sequelize**
- **Bcrypt**
- **MVC Pattern**
- **CORS**
- **Nodemon** (dev dependency)

## Project Structure

## Project Structure
```
project-manager/
├── src/
│ ├── api/
│ │ ├── project.js
│ │ ├── task.js
│ │ └── user.js
│ ├── controllers/
│ │ ├── project.js
│ │ ├── task.js
│ │ └── user.js
│ ├── models/
│ │ ├── project.js
│ │ ├── task.js
│ │ └── user.js
│ ├── routes/
│ │ ├── project.js
│ │ ├── task.js
│ │ └── user.js
│ ├── middlewares/
│ │ └── authMiddleware.js
│ ├── config/
│ │ └── database.js
│ ├── app.js
│ └── server.js
├── package.json
└── README.md
```

## Setup and Installation

### Prerequisites

- Node.js installed
- MySQL installed and running

### Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/matheusmartinsviana/project-manager.git
    cd project-manager
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Configure the database**

    Create a MySQL database with the following details:

    ```plaintext
    database: 'project-manager'
    host: 'localhost'
    username: 'root'
    dialect: 'mysql'
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

This README provides a comprehensive overview of the Project Manager System, its setup, and deployment process.
