import { useLanguage } from '../i18n/LanguageContext';
import { Sparkle } from './Icons';

// Floating shortcut to the AI design studio (#/dizajno), stacked above the WhatsApp button.
// Desktop: icon + label. Small screens: compact round icon (the label stays as aria-label).
export default function DesignFab() {
  const { t } = useLanguage();
  const label = t.designFab.label;

  return (
    <a href="#/dizajno" className="dfab" aria-label={label} title={label}>
      <span className="dfab__icon" aria-hidden="true">
        <Sparkle width={20} height={20} />
      </span>
      <span className="dfab__label" aria-hidden="true">{label}</span>
    </a>
  );
}
