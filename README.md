# 🎯 PitchMate AI

**PitchMate AI** is a smart, AI-powered web platform designed to enhance your job application process. It helps professionals craft impactful emails and analyze resumes against specific job roles using generative AI.

---

## 🚀 Features

### ✉️ AI Email Generator
Generate professional emails by specifying:
- **Tone** – Formal, Friendly, Persuasive, etc.
- **Topic** – Job Application, Follow-up, Networking, etc.
- **Description** – Short context for personalized email output

### 📄 Resume Analyzer
Upload your resume (PDF) and receive:
- An **AI-generated score** based on job fit
- **Key strengths** extracted from your resume
- **Missing skills** for the selected job title
- **Actionable suggestions** to improve your resume

---

## 🧰 Tech Stack

### Frontend
- React.js (v18+)
- react-router-dom
- Tailwind CSS
- Axios

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Gemini API (for email & resume intelligence)
- Multer (file uploads)

---

## 📁 Folder Structure

```bash
PitchMate-AI/
│
├── backend/              # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── frontend/             # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│   └── tailwind.config.js
```
##📦 Clone the Repository
```base
git clone https://github.com/MukeshSwain/PitchMate-AI.git
cd PitchMate-AI
```
##🔧 Setup the Backend
```base
cd backend
npm install
cp .env.example .env
```
## .env
```base
MONGO_URI=mongodb+srv://mukeshswain2844:GWHbqJ7TlTvckxsd@cluster0.hpll6.mongodb.net/ptchmate_ai?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
NODE_ENV=development

JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=mukeshswain2844@gmail.com
EMAIL_PASS=your_email_app_password

CLIENT_URL=http://localhost:5173

```


---

