import React, { useState } from 'react';
import Nav from './nav.jsx';
import Rout from './rout.jsx';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer.jsx';
import Productdetail from './productdetail';

const App = () => {
  // Add to cart
  const [cart, setCart] = useState([]);
  
  // Product Detail
  const [close, setClose] = useState(false);
  const [detail, setDetail] = useState([]);
  
  // Filter products
  const [product, setProduct] = useState(Productdetail);

  const searchbtn = (productCategory) => {
    const filteredProducts = Productdetail.filter((x) => {
      return x.Cat === productCategory;
    });
    setProduct(filteredProducts);
  };

  // Show product detail
  const view = (product) => {
    setDetail([{ ...product }]);
    setClose(true);
  };

  // Add to cart
  const addtocart = (product) => {
    const exists = cart.find((x) => {
      return x.id === product.id;
    });
    if (exists) {
      alert('This Product is already added to cart');
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      alert('Product is added to cart');
    }
  };

  console.log(cart);

  return (
    <>
      <BrowserRouter>
        <Nav searchbtn={searchbtn} />
        <Rout 
          product={product} 
          setProduct={setProduct} 
          detail={detail} 
          view={view} 
          close={close} 
          setClose={setClose} 
          cart={cart} 
          setCart={setCart} 
          addtocart={addtocart} 
        />
        <Footer />
      </BrowserRouter>
    </>
  );
  
};

export default App;
