import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EventsProvider } from './pages/context/EventsContext'
import { CartProvider } from './pages/context/CartContext'
import { ThemeProvider } from './pages/context/ThemeContext'

import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Checkout from './pages/Checkout'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import './pages/styles/globals.css'

function App() {
  const [language, setLanguage] = useState('pt')

  return (
    <ThemeProvider>
      <EventsProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Header language={language} setLanguage={setLanguage} />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home language={language} />} />
                  <Route path="/eventos" element={<Events language={language} />} />
                  <Route path="/evento/:id" element={<EventDetails language={language} />} />
                  <Route path="/checkout" element={<Checkout language={language} />} />
                  <Route path="/galeria" element={<Gallery language={language} />} />
                  <Route path="/contactos" element={<Contact language={language} />} />
                </Routes>
              </main>
              <Footer language={language} />
            </div>
          </Router>
        </CartProvider>
      </EventsProvider>
    </ThemeProvider>
  )
}

export default App