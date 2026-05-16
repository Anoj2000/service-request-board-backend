# Service Request Board - Backend API

Backend REST API for the Service Request Board application built with Node.js, Express, and MongoDB.

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Environment:** dotenv for configuration

## 📋 API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs (supports ?category and ?status filters)
- `GET /api/jobs/:id` - Get single job by ID
- `POST /api/jobs` - Create new job
- `PATCH /api/jobs/:id` - Update job status
- `DELETE /api/jobs/:id` - Delete job

## 🛠️ Setup Instructions

### Prerequisites
- Node.js v18 or higher
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/service-request-board-backend.git
cd service-request-board-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
```

4. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📦 Project Structure
backend/
├── models/
│   └── JobRequest.js       # MongoDB schema
├── routes/
│   └── jobs.js             # API routes
├── server.js               # Main server file
├── .env                    # Environment variables (not in git)
├── .gitignore
└── package.json

## 🌐 Deployment

Deployed on Railway: [Your Railway URL]

## 📝 Environment Variables

Required environment variables:

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string

## 👨‍💻 Author

[Your Name]

## 📅 Submission Date

May 18, 2026 - GlobalTNA Full-Stack Developer Intern Assessment