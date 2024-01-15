# Job Portal API

Welcome to the Job Portal API, a backend application developed with Node.js, Express.js, and MongoDB. This API facilitates user management, authentication, authorization, and job-related operations for a job portal application.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)


## Features

- User Registration and Management
- Authentication and Authorization
- CRUD Operations for Jobs
- Comprehensive API Documentation using Swagger UI

## Getting Started

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/your-username/your-project.git
cd your-project
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Environment Variables**

Create a .env file in the root directory with the following variables:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/jobportal
SECRET_KEY=your_secret_key_for_jwt
```

Replace the placeholder values with your actual credentials

**Running the Project**

```bash
npm start
```

The API will be accessible at http://localhost:8000.

**API Documentation**

Explore the API endpoints and their functionalities using Swagger UI:

```
http://localhost:8000/api-docs
```
**Contributing**

We welcome contributions! Feel free to open issues and pull requests.

1. Fork the repository.
2. Create your feature branch: git checkout -b feature/new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin feature/new-feature
5. Submit a pull request.


Open [http://localhost:8000](http://localhost:8000) in your browser to view the project.
