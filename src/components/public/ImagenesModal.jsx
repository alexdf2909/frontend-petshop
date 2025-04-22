import styles from './styles/ImagenesModal.module.css';

export default function ImagenesModal({ imagenes, onClose, onSelect }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>X</button>
        <div className={styles.grid}>
          {imagenes.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`img-${idx}`}
              onClick={() => {
                onSelect(url);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
