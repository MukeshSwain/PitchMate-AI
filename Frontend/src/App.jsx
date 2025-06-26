import React from 'react'
import {Toaster} from 'react-hot-toast'

import './App.css'

import FeaturesSection from './components/FeaturesSection'
import Home from './pages/Home'

import Login from './pages/Login'
import SignupPage from './pages/Signup'
import { Route,Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Sample from './pages/Sample'
import ContactPage from './pages/Contact'
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { PublicRoute } from './utils/PublicRoute'
import GeneratePage from './pages/GenerateEmail'

import ResumeChecker from './pages/ResumeCheck'
import HistoryPage from './pages/History'



function App() {
  
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumeChecker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/generate"
          element={
            <ProtectedRoute>
              <GeneratePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sample"
          element={
            <PublicRoute>
              <Sample />
            </PublicRoute>
          }
        />
        <Route path="/features" element={<FeaturesSection />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/inter" element={<MockInterviewSession />} /> */}
      </Routes>

      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App
