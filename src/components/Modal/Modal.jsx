import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../ModalOverlay";
import styles from './Modal.module.css';


const Modal = (props) => {
    useEffect(() => {
        const handleEscPress = (e) => {
            if (e.key === 'Escape') {
                props.onClose();
            }
        }
        window.addEventListener('keydown', handleEscPress);
        return () => {
            window.removeEventListener('keydown', handleEscPress);
        }
    }
    )

    return ReactDOM.createPortal(
        (
            <div className="modal_root">
                <ModalOverlay onClick={props.onClose} />
                <div className={styles.modal_container}>
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
