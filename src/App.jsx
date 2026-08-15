import Hero from './components/Hero/Hero'
import HomeRooms from './components/HomeRooms/HomeRooms'
import SmoothScroll from './components/SmoothScroll/SmoothScroll'
import './styles/globals.css'

function App() {
  return (
    <SmoothScroll>
      <main>
        <div className="hero-transition-wrapper">
          <Hero />
          <HomeRooms />
        </div>
      </main>
    </SmoothScroll>
  )
}

export default App
