import styles from './header.module.css';

import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png'
import shopCar from '../../assets/shop.png'
import profile from '../../assets/profile_red.png'
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/authContext';
import { useShoppingCart } from '../../contexts/shoppingCartContext';

export default function Header() {
    const [isChecked, setCheck] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);
    const { closeCart, openCart, cartQuantity, ordered } = useShoppingCart();

    const userChangeHandler = (e) => {
        setCheck(!isChecked);
    };

    return (
        <header className={styles.header}>
            <input type="checkbox" id={styles.check} checked={isChecked}  onChange={userChangeHandler}/>
                <label htmlFor="check" >
                    <svg onClick={() => setCheck(!isChecked)} id={styles.cancel} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path fill="#ebc429"
                            d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                    <svg onClick={() => setCheck(!isChecked)} id={styles.btn} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="#cab53f"
                            d="M32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 288zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160z" />
                    </svg>
                </label>
                <nav className={styles.navigation} onClick={() => setCheck(!isChecked)}>
                    <Link onClick={closeCart} to="/"><img className={styles.logo} src={logo} alt="logo" /></Link>
                    <h1 className={styles.name}><Link className={styles.name} to='/'>KoShiYam</Link></h1>
                    <div className={styles.menu}>
                        <NavLink onClick={closeCart} to="/menu" className={({ isActive }) => (isActive ? styles.active : '') + ' ' + styles.link} >Меню</NavLink>
                        <NavLink onClick={closeCart} to='/contacts' className={({ isActive }) => (isActive ? styles.active : '') + ' ' + styles.link}>Контакти</NavLink>
                        {isAuthenticated && (
                            <div className={styles.user}>
                                <NavLink onClick={closeCart} to='/favorites' className={({ isActive }) => (isActive ? styles.active : '') + ' ' + styles.link}>Любими</NavLink>
                                {/* <Link onClick={openCart}>
                        <img className={styles.shopCar} src={shopCar} alt="shopCar" />
                        <p className={styles.quantity}>{cartQuantity}</p>
                        </Link> */}
                                <Link onClick={() => { closeCart(); ordered() }} to="/logout" className={styles.link}>Изход</Link>
                                <Link onClick={closeCart} to="/profile"><img className={styles.shopCar} src={profile} alt="profile" /></Link>
                            </div>)}
                        {!isAuthenticated && (
                            <div className={styles.guest}>
                                <NavLink to='/login' className={({ isActive }) => (isActive ? styles.active : '') + ' ' + styles.link}>Вход</NavLink>
                                <NavLink to='/register' className={({ isActive }) => (isActive ? styles.active : '') + ' ' + styles.link}>Регистрация</NavLink>
                            </div>
                        )}
                        <Link onClick={openCart}>
                            <img className={styles.shopCar} src={shopCar} alt="shopCar" />
                            {(cartQuantity > 0) ?
                                <p className={styles.quantity}>{cartQuantity}</p>
                                :
                                <p></p>
                            }
                        </Link>
                    </div>
                </nav>
        </header>
    );
}