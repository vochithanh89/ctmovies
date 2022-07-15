import Modal from '../shared/Modal/Modal';
import styles from './UserInfoModal.module.scss';
import useModal from '@/hooks/useModal';
import { useEffect, useRef } from 'react';
import Image from '../shared/Image/Image';
import useGetUserFirebase from '@/hooks/useGetUserFirebase';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

function UserInfoModal({ children, className }) {
    const user = useGetUserFirebase();
    const { isOpen, toggle } = useModal();
    const userInfoBtnRef = useRef();
    const userInfoModalRef = useRef();

    useEffect(() => {
        const userInfoBtnEl = userInfoBtnRef.current;
        const userInfoModalEl = userInfoModalRef.current;

        const { x, width } = userInfoBtnEl.getBoundingClientRect();
        userInfoModalEl.style = `left: ${x + width}px;`;
    }, []);

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <>
            <button ref={userInfoBtnRef} onClick={toggle} className={className}>
                {children}
            </button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <div ref={userInfoModalRef} className={styles.userInfoModal}>
                    {user && (
                        <div className={styles.userInfo}>
                            <Image className={styles.userImg} src={user.photoURL} alt="user avatar" />
                            <div className={styles.userDetails}>
                                <h2 className={styles.userName}>{user.displayName}</h2>
                                <p className={styles.userEmail}>{user.email}</p>
                            </div>
                        </div>
                    )}
                    <div className={styles.menu}>
                        <button onClick={handleLogout} className={styles.menuItem}>
                            Logout
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default UserInfoModal;
