//Hola pull test
import { useEffect, useState } from "react"

import { db } from "./data/db"
import Header from "./components/Header"
import Guitar from "./components/Guitar"

function App() {

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

  return (
    <>
    <Header 
    cart={cart}
    removeFromCart={removeFromCart}
    incrementQuantity={incrementQuantity}
    decrementQuantity={decrementQuantity}
    clearCart={clearCart}
    
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((item)=>(
              <Guitar 
              key={item.id}
              guitar={item}
              setCart={setCart}
              addToCart={addToCart}
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
