import { createContext, useContext, useState } from "react";

import { ShoppingCart } from "../components/ShoppingCart/ShoppingCart";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';


const ShoppingCartContext = createContext({});

const cookie = read_cookie('shop');

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
};

export function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useState(cookie);
    const [isOpen, setIsOpen] = useState(false);

    bake_cookie('shop', cartItems);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    );

    function getItemQuantity(id) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function shopping(id, count) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: count }]
            }
            else {
                console.log(currItems);
                return currItems.map(item => {
                    if (item.id === id)
                        return { ...item, quantity: item.quantity + count }
                    else {
                        return item;
                    }

                })
            }
        })
    }

    //
    function ordered() {
        setCartItems([]);
    }


    function increaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }]
            }
            else {
                return currItems.map(item => {
                    if (item.id === id) {
                        console.log(item);
                        console.log(currItems);
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id) {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity == 1) {
                return currItems.filter(item => item.id !== id)
            }
            else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    }
                    else {
                        return item;
                    }
                })
            }
        })
    }

    function removeFromCart(id) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        })
    }

    return (
        <ShoppingCartContext.Provider value={{ordered, shopping, removeFromCart, openCart, closeCart, cartQuantity, cartItems, getItemQuantity, increaseCartQuantity, decreaseCartQuantity }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}