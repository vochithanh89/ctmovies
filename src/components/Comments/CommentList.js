import styles from './Comments.module.scss';
import Image from '../shared/Image/Image';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { BsFlag, BsThreeDots, BsTrash } from 'react-icons/bs';
import useGetFirestore from '@/hooks/useGetFirestore';
import { memo, useEffect, useMemo, useState } from 'react';
import useGetUserFirebase from '@/hooks/useGetUserFirebase';
import { deleteDocDB, updateArrayDocumentToDB } from '@/firebase/service';

function CommentList({ roomId }) {
    const collectionString = 'comments';

    const comments = useGetFirestore(
        collectionString,
        {
            fieldName: 'roomId',
            operator: '==',
            value: roomId,
        },
        { fieldName: 'createdAt', orderBy: 'desc' },
    );

    const user = useGetUserFirebase();
    const [currentCommentId, setCurrentCommentId] = useState(null);

    const isComment = useMemo(() => {
        return !!comments?.length;
    }, [comments]);

    const handleLike = (id, likedMembers) => {
        if (likedMembers.includes(user.uid)) {
            updateArrayDocumentToDB(collectionString, id, 'likedMembers', user.uid, 'remove');
        } else {
            updateArrayDocumentToDB(collectionString, id, 'likedMembers', user.uid, 'update');
            updateArrayDocumentToDB(collectionString, id, 'dislikedMembers', user.uid, 'remove');
        }
    };

    const handleDislike = (id, dislikedMembers) => {
        if (dislikedMembers.includes(user.uid)) {
            updateArrayDocumentToDB(collectionString, id, 'dislikedMembers', user.uid, 'remove');
        } else {
            updateArrayDocumentToDB(collectionString, id, 'dislikedMembers', user.uid, 'update');
            updateArrayDocumentToDB(collectionString, id, 'likedMembers', user.uid, 'remove');
        }
    };

    useEffect(() => {
        const closeCommentMenu = () => {
            setCurrentCommentId(null);
        };
        window.addEventListener('click', closeCommentMenu);
        return () => window.removeEventListener('click', closeCommentMenu);
    }, []);

    const handleSetCurrentCommentId = (id) => {
        if (currentCommentId === id) {
            setCurrentCommentId(null);
        } else {
            setCurrentCommentId(id);
        }
    };

    const handleRemoveComment = (id) => {
        deleteDocDB(collectionString, id);
    };

    return (
        <>
            {isComment ? (
                <ul className={styles.commentList}>
                    {comments.map((comment) => {
                        return (
                            <li key={comment.id} className={styles.commentItem}>
                                <Image className={styles.userAvatar} src={comment.photoURL} alt="user avatar" />
                                <div className={styles.commentDetails}>
                                    <div className={styles.info}>
                                        <h3 className={styles.userName}>{comment.displayName}</h3>
                                        <span className={styles.time}>2 year ago</span>
                                    </div>
                                    <p className={styles.commentContent}>{comment.text}</p>
                                    <div className={styles.commentActions}>
                                        <div className={styles.actionBtn}>
                                            <button
                                                onClick={() => handleLike(comment.id, comment.likedMembers)}
                                                disabled={!user}
                                            >
                                                {comment.likedMembers.includes(user?.uid) ? (
                                                    <AiFillLike />
                                                ) : (
                                                    <AiOutlineLike />
                                                )}
                                            </button>
                                            <span className={styles.count}>{comment.likedMembers.length}</span>
                                        </div>
                                        <div className={styles.actionBtn}>
                                            <button
                                                onClick={() => handleDislike(comment.id, comment.dislikedMembers)}
                                                disabled={!user}
                                            >
                                                {comment.dislikedMembers.includes(user?.uid) ? (
                                                    <AiFillDislike />
                                                ) : (
                                                    <AiOutlineDislike />
                                                )}
                                            </button>
                                            <span className={styles.count}>{comment.dislikedMembers.length}</span>
                                        </div>
                                        <div className={styles.actionBtn}>
                                            <button
                                                onClick={(e) => {
                                                    handleSetCurrentCommentId(comment.id);
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <BsThreeDots />
                                            </button>
                                            {currentCommentId === comment.id && (
                                                <div
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={styles.commentMenu}
                                                >
                                                    {user.uid === comment.uid && (
                                                        <button
                                                            onClick={() => handleRemoveComment(comment.id)}
                                                            className={styles.commentMenuBtn}
                                                        >
                                                            <BsTrash />
                                                            Remove
                                                        </button>
                                                    )}
                                                    <button className={styles.commentMenuBtn}>
                                                        <BsFlag />
                                                        Report
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className={styles.messageNoComment}>No comment</p>
            )}
        </>
    );
}

export default memo(CommentList);
