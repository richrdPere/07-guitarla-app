import { useState, useEffect } from 'react'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db';



function App() {

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

    // const saveLocalStorage = () => {
    //     localStorage.setItem('cart', JSON.stringify(cart));
    // }

    return (
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />
            
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((data) => (
                        <Guitar
                            key={data.id}
                            guitar={data}
                            addToCard={addToCard}
                        />
                    ))}
                   
                </div>
            </main>


            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
