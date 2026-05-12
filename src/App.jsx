import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import AboutUs from './pages/AboutUs'
import Meetings from './pages/Meetings'
import UsefulLinks from './pages/UsefulLinks'
import Members from './pages/Members'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { useI18n } from './i18n/LanguageContext'
import './App.css'

function AppContent() {
  const { locale, t } = useI18n()
  const [currentSection, setCurrentSection] = useState('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  useEffect(() => {
    document.title = t('meta.title')
  }, [locale, t])

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true'
    setIsAdminLoggedIn(loggedIn)
  }, [])
  const handleLogin = () => {
    setIsAdminLoggedIn(true)
    localStorage.setItem('adminLoggedIn', 'true')
  }

  const handleLogout = () => {
    setIsAdminLoggedIn(false)
    localStorage.removeItem('adminLoggedIn')
    setCurrentSection('home')
  }

  const navigateTo = (section) => {
    setCurrentSection(section)
    setSidebarOpen(false)
  }

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return <Home onNavigate={navigateTo} />
      case 'projects':
        return <Projects />
      case 'about-us':
        return <AboutUs />
      case 'meetings':
        return <Meetings />
      case 'useful-links':
        return <UsefulLinks />
      case 'members':
        return <Members />
      case 'admin-login':
        return <AdminLogin onLogin={handleLogin} navigateTo={navigateTo} />
      case 'admin-dashboard':
        return isAdminLoggedIn ? (
          <AdminDashboard onLogout={handleLogout} />
        ) : (
          <AdminLogin onLogin={handleLogin} navigateTo={navigateTo} />
        )
      default:
        return <Home />
    }
  }

  return (
    <div className="app">
      <Header
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        currentSection={currentSection}
        onNavigate={navigateTo}
        isAdminLoggedIn={isAdminLoggedIn}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentSection={currentSection}
        onNavigate={navigateTo}
        isAdminLoggedIn={isAdminLoggedIn}
      />
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <main className="main-content">
        {renderContent()}
      </main>
      <footer className="footer">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </footer>
    </div>
  )
}

export default function App() {
  return <AppContent />
}
