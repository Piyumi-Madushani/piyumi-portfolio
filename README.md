# Piyumi Madushani — Personal Portfolio

A modern full-stack personal portfolio website showcasing my experience, projects, technical skills, education, certifications, and professional background as an **ICT undergraduate, Software Engineer, and Project Management enthusiast**.

The project is built as a monorepo containing a Next.js frontend and an Express.js backend API.

## 🌐 Portfolio

**Live Website:** Coming Soon

**GitHub Repository:** [Piyumi-Madushani/piyumi-portfolio](https://github.com/Piyumi-Madushani/piyumi-portfolio)

---

## ✨ Features

### Public Portfolio

* Modern responsive portfolio interface
* Hero section with professional introduction
* Technical skills showcase
* Education and certifications
* Professional experience
* Featured projects
* Contact section
* CV access
* Responsive design for desktop and mobile devices

### Admin Dashboard

* Secure admin authentication
* Project management
* Experience management
* Education management
* Certification management
* Skills management
* Contact/message management
* Create, read, update, and delete operations

### Backend API

* RESTful API architecture
* JWT-based authentication
* MongoDB database integration
* Mongoose ODM
* CRUD APIs for portfolio content
* Protected admin routes
* Centralized API structure

---

## 🛠️ Technologies

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Lucide React
* REST API integration

### Backend

* Node.js
* Express.js
* TypeScript
* MongoDB
* Mongoose
* JWT
* bcrypt

### Development Tools

* Git
* GitHub
* VS Code
* Postman
* npm

---

## 📁 Project Structure

```text
piyumi-portfolio/
│
├── frontend/
│   ├── app/
│   │   ├── admin/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   ├── lib/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── server.ts
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB
* Git

### 1. Clone the repository

```bash
git clone https://github.com/Piyumi-Madushani/piyumi-portfolio.git
```

```bash
cd piyumi-portfolio
```

---

## 💻 Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

---

## ⚙️ Backend Setup

Open another terminal and navigate to:

```bash
cd piyumi-portfolio/backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file with your backend configuration.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend development server:

```bash
npm run dev
```

The API will normally run at:

```text
http://localhost:5000
```

---

## 🔌 API Structure

The backend provides REST APIs for managing portfolio information.

| Resource       | Endpoint              |
| -------------- | --------------------- |
| Authentication | `/api/auth`           |
| Projects       | `/api/projects`       |
| Experience     | `/api/experience`     |
| Education      | `/api/education`      |
| Certifications | `/api/certifications` |
| Skills         | `/api/skills`         |
| Contact        | `/api/contact`        |

Protected administrative operations require authentication using JWT.

---

## 🔐 Authentication

The admin dashboard uses JWT-based authentication.

The general authentication flow is:

```text
Admin Login
     ↓
Backend Authentication
     ↓
JWT Token
     ↓
Frontend Stores Token
     ↓
Protected API Requests
     ↓
Admin CRUD Operations
```

Sensitive environment variables such as database credentials and JWT secrets are stored in `.env` files and are not committed to GitHub.

---

## 📊 Portfolio Management

The admin dashboard allows portfolio information to be maintained dynamically instead of hardcoding all content in the frontend.

### Manage Projects

Administrators can:

* Add projects
* Update project information
* Delete projects
* Add technologies
* Add project descriptions
* Mark projects as featured

### Manage Experience

Administrators can maintain:

* Company
* Position
* Employment period
* Description
* Technologies and responsibilities

### Manage Education & Certifications

The dashboard supports maintaining academic qualifications and professional certifications.

### Manage Skills

Technical skills can be added and updated through the administration interface.

---

## 📱 Responsive Design

The portfolio is designed to work across different screen sizes:

* Desktop
* Laptop
* Tablet
* Mobile

The interface uses a modern dark visual style with gradient and glow effects.

---

## 🚧 Future Improvements

Planned improvements include:

* [ ] Deploy frontend and backend
* [ ] Add live portfolio domain
* [ ] Add project screenshots
* [ ] Add GitHub/project links
* [ ] Improve admin dashboard analytics
* [ ] Add stronger validation and error handling
* [ ] Add automated testing
* [ ] Add API documentation
* [ ] Add deployment configuration

---

## 👩‍💻 About Me

I am an ICT undergraduate with hands-on experience in **software engineering, full-stack development, backend development, mobile application development, and project coordination**.

My technical interests include:

* Software Engineering
* Full-Stack Development
* Backend Development
* Artificial Intelligence
* Generative AI
* Intelligent Automation
* Project Management

I enjoy building practical software solutions while combining technical development with project planning, coordination, and teamwork.

---

## 📫 Contact

**Email:** [piyumiinstead@gmail.com](mailto:piyumiinstead@gmail.com)

**Location:** Sri Lanka

---

## 📄 License

This project is developed as a personal portfolio project.

© Piyumi Madushani
