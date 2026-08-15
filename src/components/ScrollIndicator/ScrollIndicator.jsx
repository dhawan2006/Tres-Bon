import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollIndicator.css'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollIndicator() {
  const thumbRef    = useRef(null)
  const trackRef    = useRef(null)
  const indicatorRef = useRef(null)

  useEffect(() => {
    // Thumb travels from top → bottom of track as user scrolls through the hero section.
    // scrub: 0.6 adds a tiny lag so motion feels smooth, not mechanical.
    const thumbAnim = gsap.to(thumbRef.current, {
      y: 120,       /* track 180px - thumb 60px = 120px travel */
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=100%',   /* one full viewport height of scrolling */
        scrub: 0.6,
      }
    })

    // Entire indicator fades out as the user scrolls toward the end of the hero
    const fadeAnim = gsap.to(indicatorRef.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: '60% top',
        end: '+=40%',
        scrub: true,
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div className="scroll-indicator" ref={indicatorRef} aria-hidden="true">
      <div className="scroll-indicator__track" ref={trackRef}>
        <div className="scroll-indicator__thumb" ref={thumbRef} />
      </div>
      <span className="scroll-indicator__label">scroll to explore</span>
    </div>
  )
}
