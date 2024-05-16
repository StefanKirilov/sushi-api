
import styles from './login.module.css';
import logo from '../../assets/logo.png'
import { useContext, useState } from 'react';
import * as userService from '../../services/userService';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/authContext';

const formInitialState = {
    email: '',
    password: '',
};

const domains = ['bg', 'com'];
const domainStrings = domains.join("|");
const regEx = new RegExp(`[^@]{3,}@(gmail|abv)\.(${domainStrings})`);

export default function Login() {
    const [formState, setFormState] = useState(formInitialState);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { loginSubmitHandler } = useContext(AuthContext)

    const userChangeHandler = (e) => {
        setFormState(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    };

    const submitHandler = (e) => {
        e.preventDefault();

        loginSubmitHandler(formState);
        setFormState(formInitialState);
    }

    const validator = () => {
        if (!formState.password) {
            setErrors(state => ({
                ...state,
                password: 'Password must be required!'
            }))
        }
        if (formState.password) {
            if (formState.password.length < 4 || formState.password.length > 8) {
                setErrors(state => ({
                    ...state,
                    password: 'Password must be between 4 and 8 characters!'
                }))
            }
            else {
                setErrors(state => ({
                    ...state,
                    password: ''
                }))
            }
        }
        if (!formState.email) {
            setErrors(state => ({
                ...state,
                email: 'Email must be required!'
            }))
        }
        if (formState.email) {
            if (!regEx.test(formState.email)) {
                setErrors(state => ({
                    ...state,
                    email: 'Email is not valid!'
                }))
            }
            else {
                setErrors(state => ({
                    ...state,
                    email: ''
                }))
            }
        }
    }

    return (
        <div className={styles["login-container"]}>
            <section className={styles["login-page"]} >
                <img className={styles.image} src={logo} alt="" />
                <form className={styles["login-form"]} onSubmit={submitHandler} >
                    <div className={styles.container}>
                        <h1>Вход</h1>
                        <label name='email'>Имейл</label>
                        <input type="text" id="email" name="email" value={formState.email} onChange={userChangeHandler} onKeyUp={validator} placeholder='Напиши имейл...' />
                        {errors.email && (
                            <p className={styles.errorMsg}>{errors.email}</p>
                        )}
                        <label name='password'>Парола</label>
                        <input type="password" id="password" name="password" value={formState.password} onChange={userChangeHandler} onKeyUp={validator} placeholder='Напиши парола...' />
                        {errors.password && (
                            <p className={styles.errorMsg}>{errors.password}</p>
                        )}
                        <input className={styles.btn} type='submit' value="ВХОД" disabled={Object.values(errors).some(x => x)} />

                        <p className={styles.field}>
                            <span>Ако нямаш регистрация натисни <Link to='/register'>тук</Link></span>
                        </p>
                    </div >
                </form >
            </section >
        </div >
    );
}