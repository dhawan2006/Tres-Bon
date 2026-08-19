import { useState, useEffect } from 'react'
import Navigation from './components/Navigation/Navigation'
import Hero from './components/Hero/Hero'
import HomeRooms from './components/HomeRooms/HomeRooms'
import LocationSection from './components/LocationSection/LocationSection'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'
import ReservationPage from './components/ReservationPage/ReservationPage'
import './styles/globals.css'

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#reserve') {
        setIsReservationOpen(true)
      } else {
        setIsReservationOpen(false)
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleCloseReservation = () => {
    window.history.pushState('', document.title, window.location.pathname + window.location.search)
    setIsReservationOpen(false)
  }

  return (
    <>
      <SmoothScroll>
        <Navigation />
        <main>
          <div className="hero-transition-wrapper">
            <Hero />
            <HomeRooms />
          </div>
          <LocationSection />
        </main>
      </SmoothScroll>
      
      <ReservationPage 
        isOpen={isReservationOpen} 
        onClose={handleCloseReservation} 
      />
    </>
  )
}

export default App
