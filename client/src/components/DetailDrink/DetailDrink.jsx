import styles from './detail.module.css';

import shopCar from '../../assets/shop.png'

import { useEffect, useState } from 'react';

import * as apiService from '../../services/apiService';
import { Link, useParams } from 'react-router-dom';
import { useShoppingCart } from '../../contexts/shoppingCartContext';

export default function Sushi() {
    const { id } = useParams();
    const [drinks, setDrinks] = useState([]);
    const [count, setCount] = useState(0);

    const {shopping } = useShoppingCart();

    useEffect(() => {
        apiService.getOneDrink(id)
            .then(data => setDrinks(data))
            .catch(error => console.log(error));
    }, []);

    const plus = () => {
        setCount(oldCount => oldCount + 1);
    };
    const minus = () => {
        if (count == 0) {
            return;
        }
        setCount(oldCount => oldCount - 1);
    };

    const shop = (id, count) => {
        shopping(id, count)
        setCount(0);
    };


    return (
        <div className={styles.top}>
            <div className={styles['container-first']}>
                <div className={styles['container-img']}>
                    <img className={styles.image} src={drinks.image} />
                </div>
                <div className={styles['container-items']}>
                    <p className={styles.price}>{drinks.price} лв.</p>
                    <p className={styles.weight}>/ {drinks.volume} гр.</p>
                    <h1 className={styles.name}> {drinks.name} </h1>
                    <div className={styles.btn}>
                        <button onClick={minus}>-</button>
                        <p className={styles.number}>{count}</p>
                        <button onClick={plus}>+</button>
                        <Link onClick={() => shop(drinks._id, count)} className={styles.shopCar} to=""><img src={shopCar} alt="" /></Link>
                    </div>
                    <p className={styles.description}>{drinks.description}</p>
                </div>
            </div>
        </div >
    );
}