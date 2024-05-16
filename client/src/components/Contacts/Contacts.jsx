import styles from './contacts.module.css';
import bin from '../../assets/trash-solid.svg';
import edit from '../../assets/edit.svg';
import full_thumb from '../../assets/full_thumb.png';
import empty_thumb from '../../assets/empty_thumb.png';
import moment from 'moment';

import picture_1 from '../../assets/image_1.png';
import picture_2 from '../../assets/image_2.png';
import picture_3 from '../../assets/image_4.png';
import picture_4 from '../../assets/image_5.png';
import picture_5 from '../../assets/image_3.jpg';
import picture_6 from '../../assets/image_7.jpg';
import picture_7 from '../../assets/image_8.jpg';
import picture_8 from '../../assets/image_9.jpg';

import { useEffect, useState } from 'react';

import * as apiService from '../../services/apiService';
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

const formInitialState = {
    comment: '',
};

export default function Footer() {
    const [formState, setFormState] = useState(formInitialState);
    const [comments, setComments] = useState([]);
    const [updateComment, setUpdate] = useState({});
    const [change, setChange] = useState(false);
    const [isEdit, setEdit] = useState(true);
    const [isLiked, setLike] = useState(false);

    const { userId, isAuthenticated } = useContext(AuthContext);

    let sortedComments = comments.sort(function(a, b) {
        let c = new Date(a.date);
        let d = new Date(b.date);
        return c-d;
    });

    useEffect(() => {
        apiService.getAllComments()
            .then(data => setComments(data))
            .catch(error => console.log(error));
    }, [change]);

    const commentChangeHandler = (e) => {
        setFormState(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    };

    const updateCommentChangeHandler = (e) => {
        setUpdate(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    };

    const createComment = async (e) => {
        e.preventDefault();

        const result = await apiService.postComment(formState);
        console.log(result);

        setFormState(formInitialState);
        setChange(!change);
    }

    const deleteComment = async (id) => {
        await apiService.deleteComment(id);
        setChange(!change);
    }

    const editComment = async (id) => {
        let filteredComment = comments.filter(comment => comment._id === id);

        setUpdate({ id: filteredComment[0]._id, text: filteredComment[0].comment });
        setEdit(!isEdit);
    }

    const saveComment = async (e) => {
        e.preventDefault();
        let id = updateComment.id;
        await apiService.updateComment(id, { comment: updateComment.text });
        setEdit(!isEdit);
        setChange(!change);
    }

    const likeComment = async (id) => {
        await apiService.likeComment(id);

        setLike(!isLiked);
        setChange(!change);
    }

    const unlikeComment = async (id) => {
        await apiService.unlikeComment(id);

        setLike(!isLiked);
        setChange(!change);
    }


    return (
        <div className={styles.heading}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img src={picture_1} alt="" />
                    <img src={picture_2} alt="" />
                    <img src={picture_3} alt="" />
                    <img src={picture_4} alt="" />
                    <img src={picture_5} alt="" />
                    <img src={picture_6} alt="" />
                    <img src={picture_7} alt="" />
                    <img src={picture_8} alt="" />
                </div>
                <div className={styles.text}>
                    <h1 className={styles.title}>Контакти</h1>
                    <h1 className={styles.workTime}>С всяка хапка си все по-близо до своя "Икигай"!</h1>
                    <h2>Работно време:</h2>
                    <ul>
                        <li>Понеделник 10:30 - 22:00</li>
                        <li>Вторник 10:30 - 22:00</li>
                        <li>Сряда 10:30 - 22:00</li>
                        <li>Четвъртък 10:30 - 22:00</li>
                        <li>Петък 10:30 - 22:00</li>
                        <li>Събота 11:00 - 22:00</li>
                        <li>Неделя 11:00 - 22:00</li>
                    </ul>
                    <h2>Адрес:</h2>
                    <p>"Никола Кожухаров" 2, Стара Загора, 6000</p>
                    <h2>Телефон: </h2>
                    <p>0877 72 80 60</p>
                    <h2>Имейл: </h2>
                    <p>stefank5248&#64;gmail.com</p>
                </div>
            </div>
            <div className={styles.comment}>
                {sortedComments &&
                    sortedComments.map(comment =>
                        <div key={comment._id} className={styles["div-comment"]}>
                            <p>Име:{comment.username}</p>
                            <p>Коментар:{comment.comment}</p>
                            {isEdit &&
                                <div className={styles["bin-wrapper"]}>
                                    <p className={styles.likes}>{comment.likes.length} харесвания</p>
                                    {
                                        (userId === comment.owner) ?
                                            <div className={styles["wrapper"]}>
                                                <img onClick={() => editComment(comment._id)} className={styles.edit} src={edit} alt="" />
                                                <img onClick={() => deleteComment(comment._id)} className={styles.bin} src={bin} alt="" />
                                            </div>
                                            :
                                            <div className={styles["wrapper"]}>
                                                {
                                                    (comment.likes.find(id => id == userId)) ?
                                                        <img onClick={() => unlikeComment(comment._id)} className={styles.bin} src={full_thumb} alt="" />
                                                        :
                                                        <img onClick={() => likeComment(comment._id)} className={styles.bin} src={empty_thumb} alt="" />
                                                }
                                            </div>
                                    }
                                </div>
                            }
                            <p>{moment(comment.date).fromNow()}</p>
                        </div>)
                }
                {isAuthenticated && (
                    isEdit ?
                        <form className={styles.form} onSubmit={createComment}>
                            <label name='comment' className={styles.titleComment}>Остави коментар:</label>
                            <textarea name="comment" cols="30" rows="10" value={formState.comment} onChange={commentChangeHandler}></textarea>
                            <button className={styles.btn} disabled={!formState.comment}>ДОБАВИ КОМЕНТАР</button>
                        </form>
                        :
                        <form className={styles.form} onSubmit={saveComment}>
                            <label name='comment' className={styles.titleComment}>Промени коментар</label>
                            <textarea name="text" cols="30" rows="10" value={updateComment.text} onChange={updateCommentChangeHandler}></textarea>
                            <button className={styles.btn} disabled={!updateComment.text}>ПРОМЕНИ КОМЕНТАР</button>
                        </form>
                )
                }
            </div>
        </div>
    );
}