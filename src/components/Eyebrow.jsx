export default function Eyebrow({ index, children, light = false }) {
  return (
    <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>
      {index && <span className="eyebrow__index">{index}</span>}
      <span className="eyebrow__line" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
