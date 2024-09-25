import { createContext, useContext, useStateReact, useState} from 'react';
const ProductContext = createContext({});

const ProductContextProvider = ({children}) => {
  const [products, setProducts] = useState();
  const setProductData = (args) =>{
    setProducts(args);
  }
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
    {children}
  </ProductContext.Provider>
  )
}
export default ProductContextProvider;
export const useProductContext = () => useContext(ProductContext);