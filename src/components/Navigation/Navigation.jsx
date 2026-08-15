import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import BrandLogo from './BrandLogo'
import './Navigation.css'

export default function Navigation() {
  const navRef = useRef(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // 1. Initial Reveal Animation (Matches Hero timeline delay: 0.4s)
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -18 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.4 }
    )

    // 2. Scroll tracking for color change over Section 2
    const updateNavColor = () => {
      const hrSection = document.querySelector('.hr-section')
      if (!hrSection) return
      
      const rect = hrSection.getBoundingClientRect()
      // The navbar itself is around 60-80px tall including padding.
      // When the top of Section 2 reaches 80px from the top of the viewport, 
      // it is effectively underneath the navbar.
      if (rect.top <= 80) {
        setIsDark(true)
      } else {
        setIsDark(false)
      }
    }

    gsap.ticker.add(updateNavColor)
    return () => gsap.ticker.remove(updateNavColor)
  }, [])

  return (
    <nav ref={navRef} className={`nav ${isDark ? 'nav--dark' : ''}`} aria-label="Primary navigation">

      {/* LEFT — Menu button */}
      <div className="nav__left">
        <button className="nav__menu-btn" aria-label="Toggle menu" aria-expanded="false">
          <span className="nav__menu-lines" aria-hidden="true">
            <span className="nav__line" />
            <span className="nav__line" />
          </span>
          <span className="nav__menu-label">Menu</span>
        </button>
      </div>

      {/* CENTER — Brand logo (absolute-centered) */}
      <div className="nav__center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.location.reload(); }}
          aria-label="Tres Bon — Reload" 
          className="nav__logo-link"
        >
          <BrandLogo />
        </a>
      </div>

      {/* RIGHT — Inquire */}
      <div className="nav__right">
        <a href="#contact" className="nav__inquire" aria-label="Inquire">
          Inquire
        </a>
      </div>

    </nav>
  )
}
