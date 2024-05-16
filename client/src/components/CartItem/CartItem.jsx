import styles from './cartItem.module.css';

import { useEffect, useState } from "react";
import { useShoppingCart } from "../../contexts/shoppingCartContext";

import * as apiService from '../../services/apiService';


export function CartItem({ id, quantity }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        apiService.getAll()
            .then(data => setItems(data))
            .catch(error => console.log(error));
    }, [])


    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart();

    const item = items.find(i => i._id == id);
    if (item == null) return null;

    return (
        <div className={styles['container-top']}>
            <div className={styles['container-second']}>
                <div className={styles['container-img']}>
                    <img className={styles.image} src={item.image} />
                </div>
                <div className={styles['container-items']}>
                    <p> {item.name} </p>
                    <button className={styles.btn} onClick={() => decreaseCartQuantity(item._id)}>-</button>
                    <p className={styles.count}>{quantity}</p>
                    <button className={styles.btn} onClick={() => increaseCartQuantity(item._id)}>+</button>
                    <p>x</p>
                    <p className={styles.price}>{item.price} lv</p>
                    <p>=</p>
                    <p className={styles.price}>{item.price * quantity} lv</p>
                </div>
                <input onClick={() => removeFromCart(item._id)} className={styles.delete} type='submit' value="X" />
            </div>
        </div>
    )
}