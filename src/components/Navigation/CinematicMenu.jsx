import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './CinematicMenu.css'

const MENU_ITEMS = [
  { num: '01', label: 'HOME', href: '#' },
  { num: '02', label: 'OUR STORY', href: '#our-story' },
  { num: '03', label: 'MENU', href: '#menu' },
  { num: '04', label: 'EXPERIENCE', href: '#experience' },
  { num: '05', label: 'GALLERY', href: '#gallery' },
  { num: '06', label: 'PRIVATE DINING', href: '#private-dining' },
  { num: '07', label: 'CONTACT', href: '#contact' },
]

export default function CinematicMenu({ isOpen, onClose }) {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const wrapperRef = useRef(null)
  const imageRef = useRef(null)
  const logoRef = useRef(null)
  const closeRef = useRef(null)
  const itemsRef = useRef([])
  const ctaRef = useRef(null)
  const footerRef = useRef(null)
  
  const tl = useRef(null)
  const prevFocusRef = useRef(null)

  useEffect(() => {
    // Construct the timeline once
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ 
        paused: true,
        onReverseComplete: () => {
          // Restore focus to menu button when completely closed
          if (prevFocusRef.current) prevFocusRef.current.focus()
        }
      })
      
      // 1. Overlay fades in
      tl.current.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }, 
      0)
      
      // 2. Main panel (image + content) slides in horizontally
      tl.current.fromTo(wrapperRef.current, 
        { xPercent: -145 },
        { xPercent: 0, duration: 0.9, ease: "power4.out" }, 
      0)
      
      // 2.5 Subtle image scale-in effect
      if (imageRef.current) {
        tl.current.fromTo(imageRef.current,
          { scale: 1.04 },
          { scale: 1, duration: 1.1, ease: "power3.out" },
        0)
      }
      
      // 3. Header items fade in
      tl.current.fromTo([logoRef.current, closeRef.current], 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 
      0.45)
      
      // 4. Navigation items (masked text reveal)
      tl.current.fromTo(itemsRef.current, 
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power4.out" }, 
      0.5)
      
      // 5. CTA & Footer
      tl.current.fromTo([ctaRef.current, footerRef.current], 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 
      0.9)

      // Reduced motion fallback
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tl.current.duration(0.3)
      }
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Store focus to return to later
      prevFocusRef.current = document.activeElement
      
      // Lock scroll
      document.body.style.overflow = 'hidden'
      
      // Play opening animation
      tl.current.play()
    } else {
      // If it's already closed, don't reverse
      if (tl.current && tl.current.progress() > 0) {
        tl.current.reverse().then(() => {
          document.body.style.overflow = ''
        })
      } else {
        document.body.style.overflow = ''
      }
    }

    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    onClose()
    
    // Wait for the animation to finish before actually navigating
    setTimeout(() => {
      if (href.startsWith('#')) {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        console.log(`Navigating to ${href}`)
      }
    }, 900) // Match approximate reverse duration
  }

  return (
    <div 
      ref={containerRef} 
      className={`cinematic-menu ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      {/* OVERLAY */}
      <div ref={overlayRef} className="cinematic-menu__overlay" onClick={onClose} />
      
      {/* SLIDING WRAPPER */}
      <div ref={wrapperRef} className="cinematic-menu__wrapper">
        
        {/* LEFT IMAGE AREA */}
        <div className="cinematic-menu__image-panel">
          <img
              ref={imageRef}
              src={`${import.meta.env.BASE_URL}10.png`}
              alt="Tres Bon restaurant interior"
              className="cinematic-menu__image"
          />
        </div>
        
        {/* RIGHT CONTENT AREA */}
        <div className="cinematic-menu__content-panel">
          
          {/* HEADER */}
          <div className="cinematic-menu__header">
            <div ref={logoRef} className="menu-brand-lockup">
              <img
                  src={`${import.meta.env.BASE_URL}9.png`}
                  alt="Tres Bon Logo"
                  className="menu-brand-logo"
              />
              <span className="menu-brand-divider" />
              <span className="menu-brand-name">
                  Tres Bon
              </span>
            </div>
            <button 
              ref={closeRef}
              className="cinematic-menu__close" 
              onClick={onClose}
              aria-label="Close menu"
              tabIndex={isOpen ? 0 : -1}
            >
              CLOSE
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="cinematic-menu__nav" aria-label="Main menu">
            <ul className="cinematic-menu__list">
              {MENU_ITEMS.map((item, index) => (
                <li key={item.num} className="cinematic-menu__item-wrapper">
                  <a 
                    href={item.href} 
                    className="cinematic-menu__link"
                    onClick={(e) => handleLinkClick(e, item.href)}
                    tabIndex={isOpen ? 0 : -1}
                  >
                    <span className="cinematic-menu__num">{item.num}</span>
                    <div className="cinematic-menu__text-mask">
                      <span 
                        className="cinematic-menu__label"
                        ref={el => itemsRef.current[index] = el}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span className="cinematic-menu__arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* BOTTOM ACTIONS */}
          <div className="cinematic-menu__bottom">
            <div ref={ctaRef} className="cinematic-menu__cta-wrapper">
              <hr className="cinematic-menu__divider" />
              <a 
                href="#reserve" 
                className="cinematic-menu__cta"
                onClick={(e) => handleLinkClick(e, '#reserve')}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="cinematic-menu__cta-text">RESERVE A TABLE</span>
                <span className="cinematic-menu__cta-arrow" aria-hidden="true">→</span>
              </a>
            </div>
            
            <div ref={footerRef} className="cinematic-menu__footer">
              <span className="cinematic-menu__footer-title">GET IN TOUCH</span>
              <div className="cinematic-menu__socials">
                <a href="#" tabIndex={isOpen ? 0 : -1}>Instagram</a>
                <a href="#" tabIndex={isOpen ? 0 : -1}>Facebook</a>
                <a href="#" tabIndex={isOpen ? 0 : -1}>WhatsApp</a>
                <a href="#" tabIndex={isOpen ? 0 : -1}>Email</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
