import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function MenuSection({ section, isVisible }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isVisible && sectionRef.current) {
      // Trigger a subtle staggered reveal when the page becomes visible
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.menu-section__reveal'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef} 
      className={`menu-section ${section.imagePosition === 'left' ? 'menu-section--reverse' : ''}`}
    >
      <div className="menu-section__content">
        <div className="menu-section__header menu-section__reveal">
          <span className="menu-section__number">{section.number}</span>
          <h2 className="menu-section__title">{section.title}</h2>
        </div>
        <div className="menu-section__items">
          {section.items.map((item, idx) => (
            <div key={idx} className="menu-item menu-section__reveal">
              <div className="menu-item__header">
                <h3 className="menu-item__name">{item.name}</h3>
                <span className="menu-item__price">{item.price}</span>
              </div>
              <p className="menu-item__desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="menu-section__image-container menu-section__reveal">
        <img 
          src={`${import.meta.env.BASE_URL}${section.image}`} 
          alt={section.title} 
          className="menu-section__image" 
        />
      </div>
    </section>
  );
}
