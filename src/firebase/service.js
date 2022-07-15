import { db } from './config';
import { arrayRemove, arrayUnion, deleteDoc, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

export const addDocumentToDB = (collectionString, id, data) => {
    setDoc(doc(db, collectionString, id), {
        ...data,
        createdAt: serverTimestamp(),
    });
};

export const updateArrayDocumentToDB = (collectionString, id, fieldName, data, method) => {
    if (method === 'update') {
        updateDoc(doc(db, collectionString, id), {
            [fieldName]: arrayUnion(data),
        });
    } else if (method === 'remove') {
        updateDoc(doc(db, collectionString, id), {
            [fieldName]: arrayRemove(data),
        });
    }
};

export const deleteDocDB = (collectionString, id) => {
    deleteDoc(doc(db, collectionString, id));
};
