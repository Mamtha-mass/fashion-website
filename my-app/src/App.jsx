import React, { useState, useEffect } from 'react';
import Nav from './nav.jsx';
import Rout from './rout.jsx';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer.jsx';
import Productdetail from './productdetail';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';  // import your Firebase config
import axios from 'axios';

const App = () => {
  // user
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Track the user's login state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();  // Cleanup subscription on component unmount
  }, []);

  const isAuthenticated = !!user;
  
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

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:8087/cart/get-cart/${user.uid}`)
        .then((res) => {
          const fullProducts = res.data.map(item => ({
            ...item.productId,
            qty: item.qty,
          }));
          setCart(fullProducts);
        })
        .catch((err) => console.error('Error fetching cart:', err));
    }
  }, [user]);

  const fetchCart = async (userId) => {
    try {
      const cartResponse = await axios.get(`http://localhost:8087/cart/get-cart/${userId}`);
      console.log(cartResponse.data);
      const fullProducts = cartResponse.data.map(item => ({
        ...item.product,
        qty: item.qty,
      }));
      setCart(fullProducts);
      console.log('cart fetched successfully');
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCart(user.uid);
    }
  }, [user]);


  // Show product detail
  const view = (product) => {
    setDetail([{ ...product }]);
    setClose(true);
  };

  const addtocart = async (product) => {
    try {
      // Check if already in cart (frontend state)
      const exists = cart.find((x) => x.id === product.id);
      if (exists) {
        alert('This product is already added to cart');
        return;
      }

      // Send to backend
      const response = await axios.post('http://localhost:8087/cart/add-to-cart', {
        userId: user.uid,
        product: product,
        qty: 1,
      });

      if (response.status === 201 || response.status === 200) {
        console.log('Product added to cart in DB');
        await fetchCart(user.uid);
        console.log('Product added to cart:', product);
        
      } else {
        console.error('Failed to add product to cart in DB');
      }

    } catch (error) {
      console.error('Error in addtocart:', error);
    }
  };


  console.log(cart);

  return (
    <>
      <BrowserRouter>
        {user && <Nav searchbtn={searchbtn} userId={user.uid} />}
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
          isAuthenticated={isAuthenticated}
          loginWithRedirect={() => alert("Please log in to add to cart")}
          userId={user ? user.uid : null}
        />
        <Footer />
      </BrowserRouter>
    </>
  );

};

export default App;
