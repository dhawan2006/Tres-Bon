import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollIndicator.css'

gsap.registerPlugin(ScrollTrigger)

const SCROLL_INDICATOR_MODE = 'tether'; // 'tether' | 'drop'
const DEBUG_SCROLL_INDICATOR = false;

export default function ScrollIndicator() {
  const indicatorRef = useRef(null)
  const trackRef = useRef(null)
  const thumbRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const indicator = indicatorRef.current
    const track = trackRef.current
    const thumb = thumbRef.current
    const label = labelRef.current
    if (!indicator || !track || !thumb || !label) return

    const updateIndicator = () => {
      const hrSection = document.querySelector('.hr-section')
      if (!hrSection) return

      const hrRect = hrSection.getBoundingClientRect()
      const section2Top = hrRect.top
      const vh = window.innerHeight
      const scrollY = window.scrollY

      // Max track height depends on viewport
      const maxTrackHeight = window.innerWidth <= 768 ? 110 : 180
      const thumbTravelMax = maxTrackHeight - 60

      if (DEBUG_SCROLL_INDICATOR) {
        console.log({ mode: SCROLL_INDICATOR_MODE, section2Top, scrollY })
      }

      // 1. Basic Thumb Movement (always runs to show scroll progress in hero)
      const heroProgress = Math.min(1, Math.max(0, scrollY / (vh * 0.8)))
      gsap.set(thumb, { y: thumbTravelMax * heroProgress })

      // 2. Mode-specific behaviors
      if (SCROLL_INDICATOR_MODE === 'tether') {
        // Reset Drop properties
        gsap.set(indicator, { y: 0, scaleY: 1, opacity: 1 })

        // Physical Tether
        // Indicator anchored at bottom: 30px (or 24px on mobile)
        const bottomPadding = window.innerWidth <= 768 ? 24 : 30
        const defaultLabelBottom = vh - bottomPadding

        if (section2Top <= defaultLabelBottom && section2Top > (defaultLabelBottom - maxTrackHeight)) {
          // Section 2 is rising over the indicator. Push the text up, shrink the track.
          const pushUp = defaultLabelBottom - section2Top
          gsap.set(label, { y: -pushUp, opacity: 1 })
          gsap.set(track, { height: maxTrackHeight - pushUp })
        } else if (section2Top <= (defaultLabelBottom - maxTrackHeight)) {
          // Track is fully consumed. Text now fades into Section 2.
          gsap.set(track, { height: 0 })
          const overTravel = (defaultLabelBottom - maxTrackHeight) - section2Top
          gsap.set(label, { 
            y: -maxTrackHeight + (overTravel * 0.3), // gentle pull into the section
            opacity: Math.max(0, 1 - (overTravel / 40)) 
          })
        } else {
          // Section 2 is below the indicator
          gsap.set(label, { y: 0, opacity: 1 })
          gsap.set(track, { height: maxTrackHeight })
        }

      } else if (SCROLL_INDICATOR_MODE === 'drop') {
        // Reset Tether properties
        gsap.set(label, { y: 0, opacity: 1 })
        gsap.set(track, { height: maxTrackHeight })

        // Cinematic Drop
        // Calculate transition progress as Section 2 rises from vh to 0
        const progress = Math.min(1, Math.max(0, (vh - section2Top) / vh))
        
        // Accelerating easing (power3.in curve equivalent)
        const easedProgress = Math.pow(progress, 3)
        
        // Indicator drops 40% of viewport height to dive under Section 2
        const dropDistance = vh * 0.4 
        
        gsap.set(indicator, { 
          y: dropDistance * easedProgress,
          scaleY: 1 + (0.15 * easedProgress),
          opacity: Math.max(0, 1 - (easedProgress * 1.5))
        })
      }
    }

    gsap.ticker.add(updateIndicator)
    return () => gsap.ticker.remove(updateIndicator)
  }, [])

  return (
    <div className="scroll-indicator" ref={indicatorRef} aria-hidden="true">
      <div className="scroll-indicator__track" ref={trackRef}>
        <div className="scroll-indicator__thumb" ref={thumbRef} />
      </div>
      <span className="scroll-indicator__label" ref={labelRef}>scroll to explore</span>
    </div>
  )
}
