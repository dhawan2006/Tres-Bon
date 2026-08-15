import './EditorialCTA.css'

/**
 * EditorialCTA — the reusable line-CTA system used throughout the site.
 *
 *   REQUEST A PRIVATE CONSULTATION
 *   ─────────────────────────────
 *
 * Props:
 *   label  — button text
 *   theme  — 'light' (white on dark) | 'dark' (dark on light)
 *   href   — optional link target
 */
export default function EditorialCTA({ label, theme = 'light', href }) {
  const Tag = href ? 'a' : 'button'
  const linkProps = href ? { href } : { type: 'button' }

  return (
    <Tag
      className={`editorial-cta editorial-cta--${theme}`}
      aria-label={label}
      {...linkProps}
    >
      <span className="editorial-cta__label">
        {label}
      </span>
      <span className="editorial-cta__line" />
    </Tag>
  )
}
