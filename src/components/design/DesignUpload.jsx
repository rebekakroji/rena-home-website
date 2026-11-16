import { useRef, useState } from 'react';
import { UPLOAD } from '../../data/designOptions';
import { Trash, Upload } from '../Icons';

const formatSize = (bytes) =>
  bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

// Returns a translation key for the problem, or null if the file is acceptable.
const validate = (file) => {
  const typeOk = UPLOAD.types.includes(file.type) || (!file.type && UPLOAD.extensions.test(file.name));
  if (!typeOk || !UPLOAD.extensions.test(file.name)) return 'errorType';
  if (file.size > UPLOAD.maxBytes) return 'errorSize';
  return null;
};

// Drag-and-drop / click upload with preview, replace and remove.
// The photo is kept in browser memory only (object URL); the parent revokes old URLs.
export default function DesignUpload({ photo, onSelect, onRemove, d }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const handleFile = (file) => {
    if (!file) return;
    const problem = validate(file);
    if (problem) {
      setError(problem);
      return;
    }
    setLoading(true);
    const url = URL.createObjectURL(file);
    // Make sure the browser can actually decode the image before accepting it.
    const probe = new Image();
    probe.onload = () => {
      setLoading(false);
      setError(null);
      onSelect({ file, url, name: file.name, size: file.size, width: probe.naturalWidth, height: probe.naturalHeight });
    };
    probe.onerror = () => {
      URL.revokeObjectURL(url);
      setLoading(false);
      setError('errorRead');
    };
    probe.src = url;
  };

  const onInput = (e) => {
    handleFile(e.target.files?.[0]);
    e.target.value = ''; // allow choosing the same file again
  };

  const dragProps = {
    onDragEnter: (e) => { e.preventDefault(); setDragging(true); },
    onDragOver: (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; },
    onDragLeave: (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); },
    onDrop: (e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files?.[0]); },
  };

  const input = (
    <input ref={inputRef} type="file" accept={UPLOAD.accept} onChange={onInput} className="ds-file" tabIndex={-1} aria-hidden="true" />
  );
  const errorMsg = error && (
    <p className="ds-upload__error" role="alert">
      {d.upload[error]}
    </p>
  );

  if (!photo) {
    return (
      <div className={`ds-drop ${dragging ? 'is-dragging' : ''} ${loading ? 'is-loading' : ''}`} {...dragProps}>
        <button type="button" className="ds-drop__target" onClick={openPicker} aria-describedby="ds-drop-formats">
          <span className="ds-drop__icon" aria-hidden="true">
            <Upload width={28} height={28} />
          </span>
          <span className="ds-drop__title">{dragging ? d.upload.dropActive : d.upload.drop}</span>
          <span className="ds-drop__or">{d.upload.or}</span>
          <span className="btn btn--dark ds-drop__btn">{d.upload.browse}</span>
          <span id="ds-drop-formats" className="ds-drop__formats">
            {d.upload.formats}
          </span>
        </button>
        {errorMsg}
        {input}
      </div>
    );
  }

  return (
    <div className={`ds-photo ${dragging ? 'is-dragging' : ''}`} {...dragProps}>
      <div className="ds-photo__frame">
        <img src={photo.url} alt={d.upload.previewAlt} className="ds-photo__img" />
        {dragging && <span className="ds-photo__drop">{d.upload.dropActive}</span>}
      </div>
      <div className="ds-photo__bar">
        <span className="ds-photo__name" title={photo.name}>
          {photo.name} · {formatSize(photo.size)}
        </span>
        <span className="ds-photo__actions">
          <button type="button" className="ds-link-btn" onClick={openPicker}>
            <Upload width={16} height={16} /> {d.upload.replace}
          </button>
          <button
            type="button"
            className="ds-link-btn"
            onClick={() => {
              setError(null);
              onRemove();
            }}
          >
            <Trash width={16} height={16} /> {d.upload.remove}
          </button>
        </span>
      </div>
      {errorMsg}
      {input}
    </div>
  );
}
