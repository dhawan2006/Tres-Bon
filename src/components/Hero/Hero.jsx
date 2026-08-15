import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import HeroBackground from './HeroBackground'
import HeroContent from './HeroContent'
import ScrollIndicator from '../ScrollIndicator/ScrollIndicator'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // 1. Image settles (already visible, subtle scale from 1.03 → 1)
      tl.fromTo(
        '.hero__bg-img',
        { scale: 1.03 },
        { scale: 1, duration: 2.2, ease: 'power2.out' },
        0
      )

      // 2. Overlay fades in with image
      tl.fromTo(
        '.hero__overlay',
        { opacity: 0 },
        { opacity: 1, duration: 1.4 },
        0
      )

      // 4. CTA fades in
      tl.fromTo(
        '.hero__cta-wrap',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9 },
        1.0
      )

      // 5. Scroll indicator
      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        1.4
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-label="Hero">
      <HeroBackground />
      <HeroContent />
      <ScrollIndicator />
    </section>
  )
}
