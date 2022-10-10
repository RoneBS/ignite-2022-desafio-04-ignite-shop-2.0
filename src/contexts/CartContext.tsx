import { createContext, ReactNode, useState } from "react"; 

export type IProduct = {
  id: string
  name: string
  imageUrl: string
  price: string
  numberPrice: number
  description: string
  defaultPriceId: string
}

type CartContextData = {
  cartItems: IProduct[]
  cartTotal: number
  addToCart: (product: IProduct) => void
  removeCartItem: (productId: string) => void
  checkIfItemAlreadyExists: (productId: string) => boolean
}

type CartContextProviderProps = {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([])

  const cartTotal = cartItems.reduce((total, product) => {
    return total + product.numberPrice
  }, 0)

  const addToCart = (product: IProduct) => {
    setCartItems((state) => [...state, product])
  }

  const removeCartItem = (productId: string) => {
    setCartItems((state) => state.filter((item) => item.id !== productId))
  }

  const checkIfItemAlreadyExists = (productId: string) => {
    return cartItems.some((product) => product.id === productId)
  }


  return(
    <CartContext.Provider value={{ cartItems, cartTotal, addToCart, removeCartItem, checkIfItemAlreadyExists,  }}>
      {children}
    </CartContext.Provider>
  )
}