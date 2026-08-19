import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import ReservationForm from './ReservationForm'
import './ReservationPage.css'

export default function ReservationPage({ isOpen, onClose }) {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const formRef = useRef(null)
  
  const tl = useRef(null)
  const prevFocusRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ 
        paused: true,
        onReverseComplete: () => {
          if (prevFocusRef.current) prevFocusRef.current.focus()
        }
      })
      
      // 1. Overlay fades in
      tl.current.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }, 
      0)
      
      // 2. Main panel slides up slightly and fades in
      tl.current.fromTo(panelRef.current, 
        { yPercent: 5, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
      0.1)

      // 3. Image slight scale in
      if (imageRef.current) {
        tl.current.fromTo(imageRef.current,
          { scale: 1.05 },
          { scale: 1, duration: 1.2, ease: "power2.out" },
        0.1)
      }
      
      // 4. Content elements fade up
      const els = contentRef.current.querySelectorAll('.res-reveal')
      if (els.length > 0) {
        tl.current.fromTo(els, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 
        0.3)
      }

      // 5. Form fade up
      if (formRef.current) {
        tl.current.fromTo(formRef.current, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
        0.5)
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        tl.current.duration(0.3)
      }
    }, containerRef)
    
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isOpen) {
      prevFocusRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      tl.current.play()
    } else {
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div 
      ref={containerRef} 
      className={`reservation-page ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      <div ref={overlayRef} className="reservation-page__overlay" onClick={onClose} />
      
      <div ref={panelRef} className="reservation-page__panel">
        
        {/* CLOSE BUTTON */}
        <button 
          className="reservation-page__close" 
          onClick={onClose}
          aria-label="Close reservation"
          tabIndex={isOpen ? 0 : -1}
        >
          CLOSE
        </button>

        {/* LEFT: VISUAL & EDITORIAL */}
        <div className="reservation-page__left">
          <img
            ref={imageRef}
            src={`${import.meta.env.BASE_URL}10.png`}
            alt="Tres Bon Dining Room"
            className="reservation-page__image"
          />
          <div className="reservation-page__image-overlay"></div>
          
          <div ref={contentRef} className="reservation-page__editorial">
            <div className="reservation-page__brand res-reveal">
              <img
                src={`${import.meta.env.BASE_URL}9.png`}
                alt="Tres Bon Logo"
                className="reservation-brand-logo"
              />
              <span className="reservation-brand-name">Tres Bon</span>
            </div>
            
            <h2 className="reservation-page__title res-reveal">
              Reserve<br />your table
            </h2>
            <p className="reservation-page__copy res-reveal">
              Join us at Tres Bon for an intimate dining experience.
              Select your preferred date and time and our team will
              confirm your reservation shortly.
            </p>

            <div className="reservation-page__info res-reveal">
              <h3 className="res-info-title">Opening Hours</h3>
              <div className="res-info-grid">
                <div>
                  <span className="res-info-label">Lunch</span>
                  <span className="res-info-val">12:00 PM – 3:30 PM</span>
                </div>
                <div>
                  <span className="res-info-label">Dinner</span>
                  <span className="res-info-val">6:30 PM – 11:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="reservation-page__right">
          <div ref={formRef} className="reservation-page__form-container">
            <ReservationForm isOpen={isOpen} />
          </div>
        </div>

      </div>
    </div>
  )
}
