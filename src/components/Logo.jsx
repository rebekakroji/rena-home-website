import { site } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';

export default function Logo({ href = '#kryefaqja', tone = 'dark', onClick }) {
  const { t } = useLanguage();
  return (
    <a href={href} className={`logo logo--${tone}`} onClick={onClick} aria-label={t.logo.aria}>
      <img src={site.logo} alt="" width="44" height="44" className="logo__mark" />
      <span className="logo__word">
        <span className="logo__rena">RENA</span>
        <span className="logo__home">HOME</span>
      </span>
    </a>
  );
}
