import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MenuPage.css';
import { menuSections } from './menuData';
import MenuSection from './MenuSection';
import MenuFooter from './MenuFooter';

export default function MenuPage({ isOpen, onClose }) {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // Clean up any ongoing animations
    gsap.killTweensOf([
      pageRef.current, 
      contentRef.current, 
      headerRef.current, 
      heroRef.current ? heroRef.current.children : null
    ]);

    if (isOpen) {
      document.body.style.overflow = 'hidden';

      tl.current = gsap.timeline();

      // Reset properties changed by the close animation
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, y: 0, scale: 1 });

      // 1. Fade in the background overlay
      tl.current.fromTo(pageRef.current,
        { opacity: 0, pointerEvents: 'none', y: 0 },
        { opacity: 1, pointerEvents: 'auto', duration: 0.6, ease: 'power2.out' }
      );

      // 2. Slide header down
      if (headerRef.current) {
        tl.current.fromTo(headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          "-=0.2"
        );
      }

      // 3. Reveal hero text
      if (heroRef.current) {
        tl.current.fromTo(heroRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          "-=0.4"
        );
      }
      
    } else {
      // Smooth fade out close animation
      const closeTl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          gsap.set(pageRef.current, { opacity: 0, pointerEvents: 'none', y: 0 });
          if (contentRef.current) gsap.set(contentRef.current, { opacity: 1, y: 0, scale: 1 });
        }
      });

      // Smoothly fade out the entire overlay to reveal the home page seamlessly
      closeTl.to(pageRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div 
      ref={pageRef} 
      className={`menu-page-overlay ${isOpen ? 'is-open' : ''}`}
      aria-hidden={!isOpen}
    >
      {/* Scrollable Container */}
      <div className="menu-page-scroll" ref={contentRef} data-lenis-prevent="true">
        
        {/* Sticky Header */}
        <header className="menu-page-header" ref={headerRef}>
          <div className="menu-brand-lockup">
            <img
                src={`${import.meta.env.BASE_URL}9.png`}
                alt="Tres Bon Logo"
                className="menu-brand-logo"
            />
            <span className="menu-brand-divider" />
            <span className="menu-brand-name">Tres Bon</span>
          </div>
          
          <button 
            className="menu-page-close" 
            onClick={onClose}
            aria-label="Close menu"
          >
            CLOSE
          </button>
        </header>

        {/* Hero Area */}
        <div className="menu-page-hero" ref={heroRef}>
          <h1 className="menu-page-hero__title">Menu</h1>
          <p className="menu-page-hero__subtitle">COME AND TASTE OUR DELICACIES</p>
        </div>

        {/* Menu Sections */}
        <div className="menu-page-content">
          {menuSections.map(section => (
            <MenuSection key={section.id} section={section} isVisible={isOpen} />
          ))}
        </div>

        {/* Footer */}
        <MenuFooter />
      </div>
    </div>
  );
}
