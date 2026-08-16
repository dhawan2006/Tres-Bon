import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './LocationSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function LocationSection() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // MASTER TIMELINE: Driven by scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 95%', // Wait until the content is a bit more in-view before starting the reveal
          end: 'top 20%',   // Complete the reveal slightly higher up
          scrub: 1.2,       // Smooth, interpolated scrubbing
        }
      })

      // 1. Headline line-by-line reveal
      // translateY(100%) -> translateY(0)
      tl.to('.location__line', {
        y: '0%',
        opacity: 1,
        stagger: 0.12,
        ease: 'power3.out',
      }, 0)

      // 2. Image blur -> sharp, opacity, scale
      // filter: blur(10px) -> blur(0px)
      tl.to(imageRef.current, {
        filter: 'blur(0px)',
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
      }, 0.15) // Start slightly after headline begins

      // 3. Supporting paragraphs
      // translateY(25px) -> 0
      tl.to('.location__paragraph', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }, 0.35) // Trigger after headline has significantly progressed

      // 4. Subtle Parallax effect - continuous across the entire viewport travel
      gsap.fromTo(imageRef.current, 
        { y: -20 },
        {
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom', // Start parallax as soon as container enters
            end: 'bottom top',   // End when container leaves
            scrub: true,
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="location-section" ref={sectionRef} aria-label="Location & Experience">
      <div className="location__container" ref={containerRef}>
        
        {/* LEFT COLUMN */}
        <div className="location__left">
          <h2 className="location__headline">
            <span className="location__line-mask"><span className="location__line">Tres Bon brings together</span></span>
            <span className="location__line-mask"><span className="location__line">thoughtful cuisine, warm</span></span>
            <span className="location__line-mask"><span className="location__line">hospitality and an atmosphere</span></span>
            <span className="location__line-mask"><span className="location__line">designed to make every visit</span></span>
            <span className="location__line-mask"><span className="location__line">feel memorable.</span></span>
          </h2>
          
          <div className="location__text-content">
            <p className="location__paragraph">
              Nestled in the heart of the city, our location provides a serene escape from the bustling streets—an environment thoughtfully curated for those who appreciate the finer details of dining.
            </p>
            <p className="location__paragraph">
              Every element of our space is crafted to elevate your experience, from the custom lighting that shifts effortlessly with the day, to the intimate seating that invites lingering conversation.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="location__right">
          <div className="location__image-wrapper">
            <img 
              ref={imageRef}
              src={`${import.meta.env.BASE_URL}3.jpg`} 
              alt="Tres Bon Dining Experience" 
              className="location__image"
              draggable="false"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
