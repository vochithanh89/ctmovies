import { modalSlice } from '@/components/redux/modalSlice';
import { auth } from '@/firebase/config';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function useGetUserFirebase() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubcribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, displayName, photoURL, email } = user;
                dispatch(modalSlice.actions.loginModalToggle(false));
                setUser({ uid, displayName, photoURL, email });
            } else {
                setUser(null);
            }
        });
        return () => unsubcribed();
    }, [dispatch]);

    return user;
}

export default useGetUserFirebase;
