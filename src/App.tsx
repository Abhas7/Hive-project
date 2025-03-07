import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import CreateProjectPage from './pages/CreateProjectPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import { HiveProvider } from './context/HiveContext'

function App() {
  return (
    <HiveProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailsPage />} />
              <Route path="/create-project" element={<CreateProjectPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HiveProvider>
  )
}

export default App