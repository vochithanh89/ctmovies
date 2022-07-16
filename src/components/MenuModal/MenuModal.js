import Modal from '../shared/Modal/Modal';
import styles from './MenuModal.module.scss';
import useModal from '@/hooks/useModal';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCompass, FaHistory, FaSearch } from 'react-icons/fa';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import clsx from 'clsx';
import Image from '../shared/Image/Image';
import guestImg from '@/assets/images/defaultAvatar.jpg';
import { useDispatch } from 'react-redux';
import { modalSlice } from '../redux/modalSlice';
import useGetUserFirebase from '@/hooks/useGetUserFirebase';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

function MenuModal({ children, className }) {
    const dispatch = useDispatch();
    const { isOpen, toggle } = useModal();
    const user = useGetUserFirebase();

    const toggleLoginModal = () => {
        dispatch(modalSlice.actions.loginModalToggle());
        toggle();
    };

    const handleLogout = () => {
        signOut(auth);
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
                        {user ? (
                            <div className={styles.login}>
                                <Image className={styles.avatar} src={user.photoURL} alt="guest avatar" />
                                <h2 className={styles.userName}>{user.displayName}</h2>
                                <p className={styles.text}>{user.email}</p>
                                <button onClick={handleLogout} className={styles.logBtn}>
                                    <FiLogOut className={styles.icon} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className={styles.login}>
                                <Image className={styles.avatar} src={guestImg} alt="guest avatar" />
                                <h2 className={styles.userName}>Guest</h2>
                                <p className={styles.text}>You need login</p>
                                <button onClick={toggleLoginModal} className={styles.logBtn}>
                                    <FiLogIn className={styles.icon} />
                                    Login
                                </button>
                            </div>
                        )}
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
