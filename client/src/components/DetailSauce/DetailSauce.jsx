import styles from './detail.module.css';

import shopCar from '../../assets/shop.png'

import { useEffect, useState } from 'react';

import * as apiService from '../../services/apiService';
import { Link, useParams } from 'react-router-dom';
import { useShoppingCart } from '../../contexts/shoppingCartContext';

export default function Sushi() {
    const { id } = useParams();
    const [sauce, setSauce] = useState([]);
    const [count, setCount] = useState(0);

    const {shopping } = useShoppingCart();

    useEffect(() => {
        apiService.getOneSauce(id)
            .then(data => setSauce(data))
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
                    <img className={styles.image} src={sauce.image} />
                </div>
                <div className={styles['container-items']}>
                    <p className={styles.price}>{sauce.price} лв.</p>
                    <p className={styles.weight}>/ {sauce.volume} гр.</p>
                    <h1 className={styles.name}> {sauce.name} </h1>
                    <div className={styles.btn}>
                        <button onClick={minus}>-</button>
                        <p className={styles.number}>{count}</p>
                        <button onClick={plus}>+</button>
                        <Link onClick={() => shop(sauce._id, count)} className={styles.shopCar} to=""><img src={shopCar} alt="" /></Link>
                    </div>
                    <p className={styles.description}>{sauce.description}</p>
                </div>
            </div>
        </div >
    );
}