import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from '@phosphor-icons/react';
import { createPortal } from 'react-dom';
import './Lightbox.css';

// ดูรูปขนาดใหญ่ เลื่อนดูรูปถัดไปได้ (ปุ่มลูกศร / คีย์บอร์ด) กด Esc หรือคลิกพื้นหลังเพื่อปิด
function Lightbox({ images, index, onClose, onChange }) {
    const image = images[index];
    const hasMany = images.length > 1;

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (hasMany && e.key === 'ArrowRight') onChange((index + 1) % images.length);
            if (hasMany && e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
        };
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
        };
    }, [index, images.length, hasMany, onClose, onChange]);

    return createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={image.caption} onClick={onClose}>
            <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
                <img key={image.src} src={image.src} alt={image.caption} className="lightbox-img" />
                <figcaption>
                    {image.caption}
                    {hasMany && <span className="lightbox-count">{index + 1} / {images.length}</span>}
                </figcaption>

                {hasMany && (
                    <>
                        <button
                            type="button"
                            className="lightbox-nav prev"
                            aria-label="รูปก่อนหน้า"
                            onClick={() => onChange((index - 1 + images.length) % images.length)}
                        >
                            <ArrowLeft weight="bold" />
                        </button>
                        <button
                            type="button"
                            className="lightbox-nav next"
                            aria-label="รูปถัดไป"
                            onClick={() => onChange((index + 1) % images.length)}
                        >
                            <ArrowRight weight="bold" />
                        </button>
                    </>
                )}
                <button type="button" className="lightbox-close" aria-label="ปิด" onClick={onClose} autoFocus>
                    <X weight="bold" />
                </button>
            </figure>
        </div>,
        document.body,
    );
}

export default Lightbox;
