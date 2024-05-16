import { useEffect, useState } from 'react';
import styles from './profile.module.css';
import * as userService from '../../services/userService';
import profileIcon from '../../assets/profile-icon.png'
import { useContext } from 'react';
import AuthContext from '../../contexts/authContext';

const formInitialState = {
    email: '',
    username: '',
};

export default function Footer() {
    const [user, setUser] = useState(null);
    const [isEdit, setEdit] = useState(true);
    const [formState, setFormState] = useState(formInitialState);
    const { editProfileSubmitHandler } = useContext(AuthContext)

    useEffect(() => {
        userService.getProfile()
            .then(data => {
                setUser(data)
                setFormState({email: data.email, username: data.username})
            })
            .catch(error => console.log(error));
    }, [])

    const userChangeHandler = (e) => {
        setFormState(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    };

    const edit = () => {
        setEdit(!isEdit);
    }

    const save = (e) => {
        e.preventDefault();

        console.log(formState);
        editProfileSubmitHandler(formState);

        userService.getProfile()
        .then(data => setUser(data))
        .catch(error => console.log(error));
        
        setFormState(formInitialState);
        setEdit(!isEdit);
    }

    return (
        <>
            {user &&
                <div className={styles.wrap}>
                    <div>
                        <div className={styles.profile}>
                            <div className={styles.image}>
                                <img src={profileIcon} alt="img8" />
                            </div>
                            {isEdit ? <div>
                                <div className={styles.email}>
                                    <p>Имейл:</p>
                                    <p>{user.email}</p>
                                </div>
                                <div className={styles.username}>
                                    <p>Име:</p>
                                    <p>{user.username}</p>
                                </div>
                                <button className={styles.btnChange} onClick={edit} >Промени</button>
                            </div> 
                            : <div>
                                <form>
                                    <div className={styles.email}>
                                        <p>Имейл:</p>
                                        <input type="text" name="email" id="email" value={formState.email} onChange={userChangeHandler} placeholder='Напиши имейл...'/>
                                    </div>
                                    <div className={styles.username}>
                                        <p>Име:</p>
                                        <input type="text" name="username" id="username" value={formState.username} onChange={userChangeHandler} placeholder='Напиши име...'/>
                                    </div>
                                    <div className={styles["wrap-btn"]}>
                                        <button className={styles.btnChange} onClick={edit} >Отмени</button>
                                        <button className={styles.btnChange} onClick={save}> Запази</button >
                                    </div >
                                </form >
                            </div>}
                        </div >
                    </div >
                    <p className={styles.finishedOrder}>ВАШИТЕ ПОРЪЧКИ</p>
                    <div className={styles.top}>
                        {user.myOrder.map((order, index) =>
                            <div key={index} className={styles['container-top']}>
                                {order?.map(item => (
                                    <div key={item?.id}>
                                        <div className={styles['container-second']}>
                                            <div className={styles['container-img']}>
                                                <img className={styles.image} src={item?.image} />
                                            </div>
                                            <div className={styles['container-items']}>
                                                <p> {item.name} </p>
                                                <p className={styles.quantity}>{item?.quantity}</p>
                                                <p>x</p>
                                                <p className={styles.price}>{item?.price} lv</p>
                                                <p>=</p>
                                                <p className={styles.price}>{item?.price * item?.quantity} lv</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div>
                                    <p>Сума:</p>
                                    <p className={styles.allPrice}>{order.reduce((total, item) => {
                                        return total + item?.price * item?.quantity
                                    }, 0).toFixed(2)} лева</p>
                                </div>
                            </div>)}
                    </div>
                </div >
            }
        </>
    )
}