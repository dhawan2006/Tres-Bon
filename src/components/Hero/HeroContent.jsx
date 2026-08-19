import EditorialCTA from '../CTA/EditorialCTA'
import './HeroContent.css'

export default function HeroContent() {
  return (
    <div className="hero__content">
      {/* CTA */}
      <div className="hero__cta-wrap">
        <EditorialCTA
          label="RESERVE YOUR TABLE TODAY"
          theme="light"
          href="#reserve"
        />
      </div>
    </div>
  )
}
