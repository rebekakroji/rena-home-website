import { site } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';

export default function Logo({ href = '#kryefaqja', tone = 'dark', onClick }) {
  const { t } = useLanguage();
  return (
    <a href={href} className={`logo logo--${tone}`} onClick={onClick} aria-label={t.logo.aria}>
      {/* Shown at 44–64 px: small WebP (96/192 px) with a 192 px JPEG fallback instead of the 1254 px original. */}
      <picture className="img-picture">
        <source type="image/webp" srcSet={`${site.logoSmall.webp96} 96w, ${site.logoSmall.webp192} 192w`} sizes="64px" />
        <img src={site.logoSmall.jpg192} alt="" width="44" height="44" className="logo__mark" />
      </picture>
      <span className="logo__word">
        <span className="logo__rena">RENA</span>
        <span className="logo__home">HOME</span>
      </span>
    </a>
  );
}
