import { db } from '@/firebase/config';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

function useGetFirestore(collectionString, condition, sort) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const q = query(
            collection(db, collectionString),
            where(condition.fieldName, condition.operator, condition.value),
            orderBy(sort.fieldName, sort.orderBy),
        );
        const unsubcribed = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setData(data);
        });
        return () => unsubcribed();
    }, [collectionString, condition, sort]);

    return data;
}

export default useGetFirestore;
