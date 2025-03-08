//Hola pull test
import { useEffect, useState } from "react"

import { db } from "./data/db"
import Header from "./components/Header"
import Guitar from "./components/Guitar"

function App() {

  const [data,setData] = useState(db)
  const [cart,setCart] = useState([])

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
  return (
    <>
    <Header 
    
    cart={cart}
    
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
