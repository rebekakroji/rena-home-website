import { COLORS, MATERIALS, PREFERENCES, STYLES } from '../../data/designOptions';
import { Check } from '../Icons';

// Right-hand customization panel: single-choice style / color / material, multi-choice preferences.
// Clicking a selected single-choice option again clears it.
export default function DesignOptions({ choices, onChange, d }) {
  const c = d.customize;
  const pick = (key, value) => onChange({ ...choices, [key]: choices[key] === value ? null : value });
  const togglePref = (value) =>
    onChange({
      ...choices,
      preferences: choices.preferences.includes(value)
        ? choices.preferences.filter((p) => p !== value)
        : [...choices.preferences, value],
    });

  return (
    <div className="ds-options">
      <fieldset className="ds-group">
        <legend className="ds-group__label">{c.style}</legend>
        <div className="ds-chips">
          {STYLES.map((id) => (
            <button key={id} type="button" className={`ds-chip ${choices.style === id ? 'is-on' : ''}`} aria-pressed={choices.style === id} onClick={() => pick('style', id)}>
              {c.styles[id]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="ds-group">
        <legend className="ds-group__label">{c.color}</legend>
        <div className="ds-swatches">
          {COLORS.map(({ id, swatch }) => (
            <button
              key={id}
              type="button"
              className={`ds-swatch ${choices.color === id ? 'is-on' : ''}`}
              aria-pressed={choices.color === id}
              onClick={() => pick('color', id)}
            >
              <span className="ds-swatch__dot" style={{ background: swatch }} aria-hidden="true">
                {choices.color === id && <Check width={14} height={14} />}
              </span>
              <span className="ds-swatch__label">{c.colors[id]}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="ds-group">
        <legend className="ds-group__label">{c.material}</legend>
        <div className="ds-chips">
          {MATERIALS.map((id) => (
            <button key={id} type="button" className={`ds-chip ${choices.material === id ? 'is-on' : ''}`} aria-pressed={choices.material === id} onClick={() => pick('material', id)}>
              {c.materials[id]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="ds-group">
        <legend className="ds-group__label">
          {c.preferences} <span className="ds-group__hint">{c.preferencesHint}</span>
        </legend>
        <div className="ds-chips">
          {PREFERENCES.map((id) => {
            const on = choices.preferences.includes(id);
            return (
              <button key={id} type="button" className={`ds-chip ds-chip--check ${on ? 'is-on' : ''}`} aria-pressed={on} onClick={() => togglePref(id)}>
                <span className="ds-chip__box" aria-hidden="true">
                  {on && <Check width={12} height={12} />}
                </span>
                {c.prefs[id]}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
