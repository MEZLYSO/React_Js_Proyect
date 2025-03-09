import { useEffect, useState, useMemo } from "react"
import { db } from "../data/db"

// Custom hook
const useCart = () =>{
    
    const initialCart = () => {
        const localStorageItem = localStorage.getItem('cart')
        return localStorageItem?JSON.parse(localStorageItem):[]
    }

    const [data,setData] = useState(db)
    const [cart,setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])

    function addToCart(item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExist>=0) { //Existe en el carrito
        const updatedCart = [...cart] // Copea el carrito
        updatedCart[itemExist].quantity++ //Modifica el valor
        setCart(updatedCart) //Setea el nuevo valor
    }else{
        item.quantity = 1 // Añade la propiedad y la inicilaliza en 1
        setCart([...cart,item]) // Sete el nuevo carrito con el item añadido
    }
    }

    function removeFromCart(id) {
    setCart(prevCart=>prevCart.filter(guitar => guitar.id !== id))
    }

    function incrementQuantity(id) {
    const updateCart = cart.map(item=>{
        if (item.id===id && item.quantity < MAX_ITEMS) {
        return{
            ...item,
            quantity:item.quantity+1
        }
        }
        return item
    })
    setCart(updateCart)
    }

    function decrementQuantity(id) {
    const updateCart = cart.map((item)=>{
        if (item.id===id && item.quantity>MIN_ITEMS) {
        return{
            ...item,
            quantity:item.quantity-1
        }
        }
        return item
    })
    setCart(updateCart)
    }

    function clearCart(){
    setCart([])
    }

    //States derivados
    const isEmpty= useMemo(()=>cart.length === 0,[cart])
    const cartTotal = useMemo(()=> cart.reduce((total,item)=>total+(item.quantity*item.price),0),[cart])


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }

}

export default useCart