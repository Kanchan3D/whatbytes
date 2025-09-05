# WhatByte Frontend

A React frontend application for the WhatByte healthcare management system built with Vite and Tailwind CSS.

## Features

- User authentication (Login/Register)
- Patient management with CRUD operations
- Doctor management with CRUD operations
- Patient-Doctor mapping management
- Professional UI with Tailwind CSS
- Responsive design
- Real-time dashboard with statistics

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Axios for API calls
- React Router DOM for navigation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables Setup

Create a `.env` file in the frontend root directory with the following variables:

```env
# Backend API URL
VITE_API_URL=http://localhost:5001/api

# App Configuration
VITE_APP_NAME=WhatByte
VITE_APP_VERSION=1.0.0

# Development Configuration
VITE_NODE_ENV=development
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will start on http://localhost:5173 (or another port if 5173 is in use)

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Doctors.jsx
│   │   ├── Mappings.jsx
│   │   └── Patients.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── DoctorsPage.jsx
│   │   ├── Login.jsx
│   │   ├── MappingsPage.jsx
│   │   ├── PatientsPage.jsx
│   │   └── Register.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Backend API base URL | Yes | `http://localhost:5001/api` |
| `VITE_APP_NAME` | Application name | No | `WhatByte` |
| `VITE_APP_VERSION` | Application version | No | `1.0.0` |
| `VITE_NODE_ENV` | Environment mode | No | `development` |

## API Integration

The frontend communicates with the backend through the `/api` endpoints:

- Authentication: `/api/auth/*`
- Patients: `/api/patients/*`
- Doctors: `/api/doctors/*`
- Mappings: `/api/mappings/*`

## Authentication

The app uses JWT tokens stored in localStorage:
- Tokens are automatically included in API requests
- Users are redirected to login if not authenticated
- Tokens are cleared on logout

## Routing

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Main dashboard with statistics |
| `/login` | Login | User login form |
| `/register` | Register | User registration form |
| `/patients` | PatientsPage | Patient management |
| `/doctors` | DoctorsPage | Doctor management |
| `/mappings` | MappingsPage | Patient-Doctor mappings |

## Styling

The application uses Tailwind CSS for styling with:
- Responsive design patterns
- Professional color schemes
- Hover effects and transitions
- Modern UI components

## Development

### Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Backend server running on specified API URL

### Environment Setup for Different Stages

**Development (.env)**
```env
VITE_API_URL=http://localhost:5001/api
VITE_NODE_ENV=development
```

**Production (.env.production)**
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_NODE_ENV=production
```

### Building for Different Environments

```bash
# Development build
npm run dev

# Production build
npm run build

# Build with specific env file
npm run build -- --mode production
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve the `index.html` for all routes

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Check VITE_API_URL is correct
   - Ensure backend server is running
   - Verify CORS settings on backend

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors if using TS
   - Verify all imports are correct

3. **Routing Issues**
   - Ensure your server is configured for SPA routing
   - Check React Router setup
   - Verify all route paths are correct

4. **Authentication Issues**
   - Check localStorage for token
   - Verify JWT token format
   - Ensure backend authentication is working

5. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check for conflicting CSS
   - Ensure all Tailwind classes are spelled correctly

### Debug Mode

Enable development tools:
```bash
# Run with debug logging
VITE_DEBUG=true npm run dev
```

## Performance Optimization

- Use React.lazy() for code splitting
- Implement proper loading states
- Optimize bundle size with Vite's built-in optimization
- Use React.memo() for expensive components
- Implement proper error boundaries
