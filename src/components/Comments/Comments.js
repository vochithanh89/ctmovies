import styles from './Comments.module.scss';
import './EmojiPickerCustomStyles.scss';
import { useDispatch } from 'react-redux';
import guestImg from '@/assets/images/defaultAvatar.jpg';
import Image from '../shared/Image/Image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { modalSlice } from '../redux/modalSlice';
import { BsEmojiHeartEyes } from 'react-icons/bs';
import clsx from 'clsx';
import Picker from 'emoji-picker-react';
import { setEndOfContenteditable } from '../functions/functions';
import useGetUserFirebase from '@/hooks/useGetUserFirebase';
import { addDocumentToDB } from '@/firebase/service';
import { uuidv4 } from '@firebase/util';
import CommentList from './CommentList';

function Comments({ movieId, mediaType, season, episode }) {
    const roomId = useMemo(() => {
        return mediaType === 'tv' ? `${movieId}s${season}e${episode}` : movieId;
    }, [mediaType, movieId, season, episode]);

    const dispatch = useDispatch();
    const commentInputRef = useRef();
    const user = useGetUserFirebase();

    const [commentValue, setCommentValue] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [showFormActions, setshowFormActions] = useState(false);

    const handleLoginModal = () => {
        dispatch(modalSlice.actions.loginModalToggle());
    };

    useEffect(() => {
        if (commentInputRef.current) {
            const commentInputEl = commentInputRef.current;
            commentInputEl.textContent = commentValue;
            setEndOfContenteditable(commentInputEl);
        }
    }, [commentValue]);

    const handlePasteAsPlainText = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const handleInputChange = (e) => {
        const commentValue = e.target.textContent;
        setCommentValue(commentValue);
    };

    const handleSubmitComment = () => {
        const submitValue = commentValue.trim();
        if (submitValue && submitValue.length < 255) {
            //handle submitvalue
            const id = uuidv4();
            addDocumentToDB('comments', id, {
                id,
                roomId,
                ...user,
                likedMembers: [],
                dislikedMembers: [],
                text: commentValue,
            });
            //reset form input
            setCommentValue('');
        }
    };

    const handleInputFocus = () => {
        setshowFormActions(true);
    };

    const handleInputBlur = () => {
        if (!commentValue) {
            setShowPicker(false);
            setshowFormActions(false);
        }
    };

    const handlePreventEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleToggleEmojiPicker = () => {
        setShowPicker((pre) => !pre);
    };

    const handleChooseEmoji = (e, emojiObject) => {
        setCommentValue((pre) => pre + emojiObject.emoji);
    };

    return (
        <div className={styles.comments}>
            <h2 className={styles.title}>Comments</h2>
            <div>
                {user ? (
                    <>
                        <div className={styles.commentForm}>
                            <Image className={styles.userAvatar} src={user.photoURL} alt="user avatar" />
                            <div
                                ref={commentInputRef}
                                onPaste={handlePasteAsPlainText}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                onInput={handleInputChange}
                                onKeyDown={handlePreventEnter}
                                contentEditable={true}
                                className={styles.commentInput}
                                placeholder="Write your comment here..."
                                spellCheck={false}
                            />
                        </div>
                        {showFormActions && (
                            <>
                                <div
                                    className={clsx(styles.commentLength, {
                                        [styles.warning]: commentValue.length >= 200 && commentValue.length <= 255,
                                        [styles.notice]: commentValue.length > 255,
                                    })}
                                >
                                    <span>{`${commentValue.length}/255`}</span>
                                </div>
                                <div className={styles.commentFormActions}>
                                    <div className={styles.emojiPickerWrap}>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleEmojiPicker();
                                            }}
                                            onMouseDown={(e) => e.preventDefault()}
                                            className={styles.actionBtn}
                                        >
                                            <BsEmojiHeartEyes />
                                        </button>
                                        {showPicker && (
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                onMouseDown={(e) => e.preventDefault()}
                                                className={styles.emojiPicker}
                                            >
                                                <Picker
                                                    onEmojiClick={handleChooseEmoji}
                                                    disableSearchBar={true}
                                                    native={false}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleSubmitComment}
                                        onMouseDown={(e) => e.preventDefault()}
                                        className={clsx(styles.actionBtn, styles.sendBtn)}
                                        disabled={commentValue.length > 255}
                                    >
                                        Send
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className={styles.commentForm}>
                        <Image className={styles.userAvatar} src={guestImg} alt="user avatar" />
                        <h2 className={styles.noLoginText}>
                            You need{' '}
                            <button onClick={handleLoginModal} className={styles.loginBtn}>
                                Login
                            </button>{' '}
                            to comment
                        </h2>
                    </div>
                )}
            </div>

            <CommentList roomId={roomId} />
        </div>
    );
}

export default Comments;
