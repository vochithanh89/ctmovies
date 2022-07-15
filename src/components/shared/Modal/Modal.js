import ReactDOM from 'react-dom';

import styles from './Modal.module.scss';
import clsx from 'clsx';

function Modal({ background, children, className, isOpen, toggle }) {
    return ReactDOM.createPortal(
        <div
            onClick={toggle}
            className={clsx(styles.modal, className, {
                [styles.isOpen]: isOpen,
                [styles.isBackground]: background,
            })}
        >
            <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>,
        document.querySelector('body'),
    );
}

export default Modal;
