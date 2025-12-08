import React from 'react'
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
import CompraSucesso from './pages/CompraSucesso'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'

import './pages/styles/variables.css'
import './pages/styles/globals.css'
import './pages/styles/pages/home.css'
import './pages/styles/pages/events.css'
import './pages/styles/pages/about.css'
import './pages/styles/components/checkout.css'
import './pages/styles/components/header.css'
import './pages/styles/pages/gallery.css'
import './pages/styles/pages/contact.css'

function App() {
  return (
    <ThemeProvider>
      <EventsProvider>
        <CartProvider>
          <Router>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/eventos" element={<Events />} />
                  <Route path="/evento/:id" element={<EventDetails />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/compra-sucesso/:id" element={<CompraSucesso />} />
                  <Route path="/sobre" element={<About />} />
                  <Route path="/galeria" element={<Gallery />} />
                  <Route path="/contactos" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </EventsProvider>
    </ThemeProvider>
  )
}

export default App