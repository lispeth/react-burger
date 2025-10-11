import styles from './ModalOverlay.module.css';
import { useEffect, useRef } from 'react';


const ModalOverlay = (props) => {
    const modalOverlayRef = useRef(null);
    useEffect(() => {
        const handleClickOverlay = (e) => {
            if (e.target === modalOverlayRef.current) {
                props.onClick();
            }
        }
        window.addEventListener('mousedown', handleClickOverlay);

        return () => {
            window.removeEventListener('mousedown', handleClickOverlay);
        }
    }
    )
    return (
        <div
            className={styles.modal_overlay}
            ref={modalOverlayRef}>
        </div>
    )
}

export default ModalOverlay;
