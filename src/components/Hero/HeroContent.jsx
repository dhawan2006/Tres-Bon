import EditorialCTA from '../CTA/EditorialCTA'
import './HeroContent.css'

export default function HeroContent() {
  return (
    <div className="hero__content">
      {/* Hero Logo */}
      <img
        src="/logo.png"
        alt="Tres Bon Logo"
        className="hero__monogram"
        draggable="false"
      />

      {/* CTA */}
      <div className="hero__cta-wrap">
        <EditorialCTA
          label="REQUEST A PRIVATE CONSULTATION"
          theme="light"
          href="#contact"
        />
      </div>
    </div>
  )
}
