import Navigation from './components/Navigation/Navigation'
import Hero from './components/Hero/Hero'
import HomeRooms from './components/HomeRooms/HomeRooms'
import LocationSection from './components/LocationSection/LocationSection'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'
import './styles/globals.css'

function App() {
  return (
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
  )
}

export default App
