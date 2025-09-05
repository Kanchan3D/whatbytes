# WhatByte Backend

A Node.js Express backend for the WhatByte healthcare management system.

## Features

- User authentication with JWT
- Patient management
- Doctor management
- Patient-Doctor mapping
- MongoDB integration
- CORS enabled for frontend integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for input validation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables Setup

Create a `.env` file in the backend root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/whatbyte?retryWrites=true&w=majority

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=5001
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### 3. MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://cloud.mongodb.com
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string and replace the placeholder values in MONGODB_URI
5. Whitelist your IP address or use 0.0.0.0/0 for development

### 4. JWT Secret Generation

Generate a secure JWT secret using one of these methods:

**Option 1: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Option 2: Online Generator**
Use a tool like https://generate-secret.vercel.app/64

**Option 3: OpenSSL**
```bash
openssl rand -hex 64
```

### 5. Start the Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

The server will start on http://localhost:5001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Mappings
- `GET /api/mappings` - Get all patient-doctor mappings
- `POST /api/mappings` - Create new mapping
- `DELETE /api/mappings/:id` - Delete mapping

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/whatbyte` |
| `JWT_SECRET` | Secret key for JWT tokens | Yes | `your-64-character-random-string` |
| `PORT` | Server port | No (default: 5001) | `5001` |
| `NODE_ENV` | Environment mode | No (default: development) | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | No (default: http://localhost:5173) | `http://localhost:5173` |

## Deployment

This backend is configured for deployment on Vercel. The `vercel.json` file is already configured.

For other platforms, ensure you:
1. Set all environment variables
2. Install production dependencies
3. Set `NODE_ENV=production`

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your MONGODB_URI format
   - Ensure IP address is whitelisted
   - Verify database user credentials

2. **CORS Issues**
   - Check FRONTEND_URL matches your frontend URL
   - Ensure frontend is running on the specified port

3. **JWT Token Issues**
   - Verify JWT_SECRET is set and consistent
   - Check token expiration settings

4. **Port Already in Use**
   - Change PORT in .env file
   - Kill existing processes on the port

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=app:*
```
