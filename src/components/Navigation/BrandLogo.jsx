import './BrandLogo.css'

export default function BrandLogo() {
  return (
    <div className="brand-logo" aria-hidden="true">
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Tres Bon" className="brand-logo__img" />
    </div>
  )
}
