import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }) {
  useEffect(() => {
    /* 1. Reduced Motion Check */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    /* 2. Initialize Premium Lenis Configuration */
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.085,                    /* Very smooth momentum interpolation */
      duration: 1.15,                 /* Base scroll duration */
      easing: (t) => 1 - Math.pow(1 - t, 4), /* Quartic ease out */
      wheelMultiplier: 0.85,          /* Slightly dampened wheel for control */
      touchMultiplier: 1,             /* Normal touch speed */
      syncTouch: false,               /* Don't force virtual scroll on native touch */
      gestureOrientation: 'vertical',
      autoRaf: false                  /* We will drive it via GSAP's single ticker */
    })

    /* 3. Connect to GSAP ScrollTrigger */
    /* This ensures GSAP animations are driven by the exact Lenis virtual scroll position */
    lenis.on('scroll', ScrollTrigger.update)

    /* 4. Drive Lenis via GSAP Ticker */
    /* Creates one authoritative rendering pipeline */
    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(updateLenis)
    
    /* 
      Disable lag smoothing to prevent GSAP from interrupting 
      or causing jumps in Lenis scrolling when JS thread is busy
    */
    gsap.ticker.lagSmoothing(0)

    /* 6. Cleanup for StrictMode / Unmount */
    return () => {
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
