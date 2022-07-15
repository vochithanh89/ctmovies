import LoginModal from '@/components/LoginModal/LoginModal';
import MenuModal from '@/components/MenuModal/MenuModal';
import styles from './Header.module.scss';
import { HiMenuAlt1, HiOutlineDotsVertical } from 'react-icons/hi';
import SettingsModal from '@/components/Settings/SettingsModal';
import UserInfoModal from '@/components/UserInfoModal/UserInfoModal';
import Image from '@/components/shared/Image/Image';
import useGetUserFirebase from '@/hooks/useGetUserFirebase';

function Actions() {
    const user = useGetUserFirebase();

    return (
        <div className={styles.actions}>
            {user ? (
                <UserInfoModal className={styles.userInfoBtn}>
                    <Image className={styles.userImg} src={user.photoURL} alt="user avatar" />
                </UserInfoModal>
            ) : (
                <LoginModal className={styles.loginBtn}>Login</LoginModal>
            )}
            <MenuModal className={styles.menuBtn}>
                <HiMenuAlt1 />
            </MenuModal>
            <SettingsModal className={styles.settingsBtn}>
                <HiOutlineDotsVertical />
            </SettingsModal>
        </div>
    );
}

export default Actions;
