import { useContext, useEffect, useState } from 'react';
import { useShoppingCart } from '../../contexts/shoppingCartContext';
import styles from './shoppingCart.module.css';
import * as apiService from '../../services/apiService';
import { CartItem } from '../CartItem/CartItem';
import AuthContext from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';


export function ShoppingCart({ isOpen }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        apiService.getAll()
            .then(data => setItems(data))
            .catch(error => console.log(error));
    }, [])

    const { closeCart, cartItems, ordered } = useShoppingCart();
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();


    let myItems = [];
    cartItems.forEach(item => {
        items.map(i => {
            if (i._id == item.id) {
                myItems.push({ name: i.name, image: i.image, price: i.price, quantity: item.quantity, id: item.id })
            }
        })
    })

    const buy = (data) => {
        if (isAuthenticated) {
            apiService.order(data)
                .then(data => console.log(data))
                .catch(error => console.log(error));

            ordered();
            closeCart();
        }
        else {
            navigate('/login');
            closeCart();
        }
    };

    return (
        <div >
            {isOpen && (
                <div className={styles.wrap}>
                    <button className={styles.button} onClick={closeCart}>X</button>
                    <div className={styles.shopName}>
                        <h1>Покупки</h1>
                    </div>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className={styles['container-second']}>
                        <p>Сума:</p>
                        <p className={styles.allPrice}>{cartItems.reduce((total, cartItem) => {
                            const item = items.find(i => i._id == cartItem.id)
                            // setMyItems(oldState => [...oldState, item])
                            return total + (item?.price || 0) * cartItem.quantity
                        }, 0).toFixed(2)} лева</p>
                    </div>
                    <div className={styles.buttons}>
                        <input onClick={() => buy(myItems)} className={styles['order-btn']} type='submit' value="ПОРЪЧАЙ" />
                    </div>
                </div >
            )
            }
        </div >
    )
}