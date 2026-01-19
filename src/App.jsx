import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { EventsProvider } from './public/pages/context/EventsContext'
import { CartProvider } from './public/pages/context/CartContext'
import { ThemeProvider } from './public/pages/context/ThemeContext'
//Sim
import ScrollToTop from './public/components/ScrollToTop'
import Header from './public/components/Layout/Header'
import Footer from './public/components/Layout/Footer'
import Home from './public/pages/Home'
import Events from './public/pages/Events'
import EventDetails from './public/pages/EventDetails'
import Checkout from './public/pages/Checkout'
import CompraSucesso from './public/pages/CompraSucesso'
import About from './public/pages/About'
import Gallery from './public/pages/Gallery'
import Contact from './public/pages/Contact'

import './public/pages/styles/variables.css'
import './public/pages/styles/globals.css'
import './public/pages/styles/pages/home.css'
import './public/pages/styles/pages/events.css'
import './public/pages/styles/pages/about.css'
import './public/pages/styles/components/checkout.css'
import './public/pages/styles/components/header.css'
import './public/pages/styles/pages/gallery.css'
import './public/pages/styles/pages/contact.css'

function App() {
  return (
    <ThemeProvider>
      <EventsProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
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