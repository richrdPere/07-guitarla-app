import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db';

export const useCart = () => {
    
    // Variables 
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : []
    } 

    // State
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 0

    // Effect
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])


    // Funciones
    const addToCard = (item) => {

        const itemExists = cart.findIndex(guitar => guitar.id === item.id);

        if(itemExists >= 0){
            if(cart[itemExists].quantity >= MAX_ITEMS) return;

            const updateCart = [...cart];
            updateCart[itemExists].quantity++
            setCart(updateCart);
        }
        else {
            item.quantity = 1;
            setCart([...cart, item]);
        }

        saveLocalStorage();
    }

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    const increaseQuantity = (id) => {
        const updateCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1 
                }
            }
            return item;
        })
        setCart(updateCart);
    }

    const decreaseQuantity = (id) => {
        const updateCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1 
                }
            }
            return item;
        })
        setCart(updateCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    // State Derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart]);

    const cartTotal = useMemo(() => cart.reduce((total, item) => total+(item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,

        addToCard,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        
        isEmpty,
        cartTotal
    }
}

// 1er Metodo
//export default useCart;

// 2do Metodo
// export {
//     useCart;
// }

// 3er Metodo
// export const useCart = () => {

// }