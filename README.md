# WhatByte - Healthcare Management System

A comprehensive MERN stack healthcare management system for managing patients, doctors, and their relationships.

## Project Overview

WhatByte is a full-stack web application that allows healthcare administrators to:
- Manage patient records
- Manage doctor profiles
- Create patient-doctor mappings
- Track healthcare data with an intuitive dashboard
- Secure authentication and authorization

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling framework
- **Axios** - HTTP client
- **React Router DOM** - Routing

## Project Structure

```
whatbyte/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Patient.js
│   │   │   ├── Doctor.js
│   │   │   └── Mapping.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── patients.js
│   │   ├── doctors.js
│   │   └── mappings.js
│   ├── .env
│   ├── package.json
│   ├── vercel.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   └── App.jsx
│   ├── .env
│   ├── package.json
│   └── README.md
└── README.md (this file)
```

## Quick Start

### Prerequisites
- Node.js 18+ or 20+
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd whatbyte

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration

# Setup frontend
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your configuration
```

### 2. Environment Configuration

#### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/whatbyte
JWT_SECRET=your-64-character-random-string
PORT=5001
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=WhatByte
```

### 3. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit http://localhost:5173 to access the application.

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Automatic token refresh

### Patient Management
- Add new patients with personal details
- Edit existing patient information
- Delete patient records
- View patient list with search and filters

### Doctor Management
- Add new doctors with specializations
- Edit doctor profiles
- Delete doctor records
- View doctor list with specializations

### Patient-Doctor Mapping
- Assign doctors to patients
- Manage multiple doctor-patient relationships
- View mapping history
- Remove assignments

### Dashboard
- Real-time statistics
- Patient and doctor counts
- Recent activity
- Quick action buttons

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Patients
- `GET /api/patients` - Get all patients
- `POST /api/patients` - Create patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Create doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Mappings
- `GET /api/mappings` - Get all mappings
- `POST /api/mappings` - Create mapping
- `DELETE /api/mappings/:id` - Delete mapping

## Database Schema

### Users
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Patients
```javascript
{
  name: String,
  age: Number,
  gender: String,
  medicalHistory: String,
  contactInfo: String,
  createdAt: Date
}
```

### Doctors
```javascript
{
  name: String,
  specialization: String,
  createdAt: Date
}
```

### Mappings
```javascript
{
  patientId: ObjectId (ref: Patient),
  doctorId: ObjectId (ref: Doctor),
  createdAt: Date
}
```

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

## Deployment

### Backend (Vercel)
1. Connect repository to Vercel
2. Set environment variables
3. Deploy automatically

### Frontend (Vercel/Netlify)
1. Build the project
2. Deploy the `dist` folder
3. Configure environment variables

### Environment Variables for Production

#### Backend
- `MONGODB_URI` - Production MongoDB connection
- `JWT_SECRET` - Production JWT secret
- `FRONTEND_URL` - Production frontend URL

#### Frontend
- `VITE_API_URL` - Production backend URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please check the individual README files in the backend and frontend directories, or create an issue in the repository.

## Roadmap

- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Data export functionality
- [ ] Appointment scheduling
- [ ] Medical report uploads
- [ ] Multi-language support
- [ ] Mobile application
