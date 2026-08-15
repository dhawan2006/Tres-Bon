import BrandLogo from './BrandLogo'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="nav" aria-label="Primary navigation">

      {/* LEFT — Menu button */}
      <div className="nav__left">
        <button className="nav__menu-btn" aria-label="Toggle menu" aria-expanded="false">
          <span className="nav__menu-lines" aria-hidden="true">
            <span className="nav__line" />
            <span className="nav__line" />
          </span>
          <span className="nav__menu-label">Menu</span>
        </button>
      </div>

      {/* CENTER — Brand logo (absolute-centered) */}
      <div className="nav__center">
        <a href="/" aria-label="Tres Bon — Home" className="nav__logo-link">
          <BrandLogo />
        </a>
      </div>

      {/* RIGHT — Inquire */}
      <div className="nav__right">
        <a href="#contact" className="nav__inquire" aria-label="Inquire">
          Inquire
        </a>
      </div>

    </nav>
  )
}
