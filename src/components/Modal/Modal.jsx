import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../ModalOverlay";
import styles from './Modal.module.css';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';


const Modal = (props) => {
    const modalRef = useRef(null);
    useEffect(() => {
        const handleEscPress = (e) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        }
        const handleClickOverlay = (e) => {
            if (e.target !== modalRef) {
                props.onClose();
            }
        }
        window.addEventListener('keydown', handleEscPress);
        window.addEventListener('mousedown', handleClickOverlay);

        return () => {
            window.removeEventListener('keydown', handleEscPress);
            window.removeEventListener('mousedown', handleClickOverlay);
        }
    }
    )

    return ReactDOM.createPortal(
        (
            <div className="modal_root">
                <ModalOverlay />
                <div className={styles.modal_container} ref={modalRef}>
                    <header className={styles.modal_header}>
                        {props.title ? (
                            <span className={'text text_type_main-large'}>{props.title}</span>
                        ) : (
                            <span></span>
                        )
                        }
                        <CloseIcon type="primary" className={styles.cross_button} onClick={props.onClose} />
                    </header>
                    {props.children}
                </div>
            </div>
        ),
        document.body
    )
}

export default Modal;
