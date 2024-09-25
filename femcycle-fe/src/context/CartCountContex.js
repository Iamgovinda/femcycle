import { createContext, useContext, useStateReact, useState} from 'react';
const cartCountContext = createContext({});

const CartCountContextProvider = ({children}) => {
  const [cart, setCart] = useState(true);
  const setCartCountData = (args) =>{
    setCart(args);
  }
  return (
    <cartCountContext.Provider value={{ cart, setCartCountData }}>
    {children}
  </cartCountContext.Provider>
  )
}
export default CartCountContextProvider;
export const useCartContext = () => useContext(cartCountContext);