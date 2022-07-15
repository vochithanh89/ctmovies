import { useDispatch, useSelector } from 'react-redux';
import Modal from '../shared/Modal/Modal';
import styles from './LoginModal.module.scss';
import { modalSelector } from '../redux/selectors';
import { modalSlice } from '../redux/modalSlice';
import { auth, googleProvider } from '@/firebase/config';
import { signInWithPopup } from 'firebase/auth';

function LoginModal({ children, className }) {
    const dispatch = useDispatch();

    const { loginModal } = useSelector(modalSelector);

    const toggleModal = () => {
        dispatch(modalSlice.actions.loginModalToggle());
    };

    const handleLoginGoogle = () => {
        signInWithPopup(auth, googleProvider);
    };

    return (
        <div>
            <button onClick={toggleModal} className={className}>
                {children}
            </button>
            <Modal background isOpen={loginModal} toggle={toggleModal}>
                <div className={styles.loginModal}>
                    <h1 className={styles.title}>Login in CTMovies</h1>
                    <div className={styles.loginPlace}>
                        <button onClick={handleLoginGoogle} className={styles.loginBtn}>
                            <div className={styles.loginLogo}>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png"
                                    alt="google logo"
                                />
                            </div>
                            <p className={styles.loginText}>Login with Google</p>
                        </button>
                        <button className={styles.loginBtn}>
                            <div className={styles.loginLogo}>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png"
                                    alt="facebook logo"
                                />
                            </div>
                            <p className={styles.loginText}>Login with Facebook</p>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default LoginModal;
