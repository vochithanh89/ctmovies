import Modal from '../shared/Modal/Modal';
import styles from './MenuModal.module.scss';
import useModal from '@/hooks/useModal';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCompass, FaHistory, FaSearch } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import clsx from 'clsx';
import Image from '../shared/Image/Image';
import guestImg from '@/assets/images/defaultAvatar.jpg';
import { useDispatch } from 'react-redux';
import { modalSlice } from '../redux/modalSlice';

function MenuModal({ children, className }) {
    const dispatch = useDispatch();
    const { isOpen, toggle } = useModal();

    const toggleLoginModal = () => {
        dispatch(modalSlice.actions.loginModalToggle());
        toggle();
    };

    return (
        <div>
            <button onClick={toggle} className={className}>
                {children}
            </button>
            <Modal background isOpen={isOpen} toggle={toggle}>
                <div
                    className={clsx(styles.menuModal, {
                        [styles.isOpen]: isOpen,
                    })}
                >
                    <h2 className={styles.title}>Menu</h2>
                    <div className={styles.menu}>
                        <div className={styles.login}>
                            <Image className={styles.avatar} src={guestImg} alt="guest avatar" />
                            <h2 className={styles.userName}>Guest</h2>
                            <p className={styles.text}>You need login</p>
                            <button onClick={toggleLoginModal} className={styles.logBtn}>
                                <FiLogIn className={styles.icon} />
                                Login
                            </button>
                        </div>
                        <NavLink to="/" className={(nav) => clsx(styles.menuItem, { [styles.active]: nav.isActive })}>
                            <FaHome className={styles.icon} />
                            <p className={styles.text}>Home</p>
                        </NavLink>
                        <NavLink
                            to="/explore"
                            className={(nav) => clsx(styles.menuItem, { [styles.active]: nav.isActive })}
                        >
                            <FaCompass className={styles.icon} />
                            <p className={styles.text}>Explore</p>
                        </NavLink>
                        <NavLink
                            to="/history"
                            className={(nav) => clsx(styles.menuItem, { [styles.active]: nav.isActive })}
                        >
                            <FaHistory className={styles.icon} />
                            <p className={styles.text}>History</p>
                        </NavLink>
                        <NavLink
                            to="/search"
                            className={(nav) => clsx(styles.menuItem, { [styles.active]: nav.isActive })}
                        >
                            <FaSearch className={styles.icon} />
                            <p className={styles.text}>Search</p>
                        </NavLink>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default MenuModal;
