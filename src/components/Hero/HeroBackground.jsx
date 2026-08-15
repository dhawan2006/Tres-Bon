import './HeroBackground.css'

export default function HeroBackground() {
  return (
    <div className="hero__bg" aria-hidden="true">
      <img
        src="/hero.png"
        alt=""
        className="hero__bg-img"
        draggable="false"
      />
      <div className="hero__overlay" />
    </div>
  )
}
