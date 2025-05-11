import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './home'
import Product from './product'
import Cart from './cart'
import Contact from './contact'
import Signup from './SignUp'
import Registration from './Registration'


const Rout = ({product, setProduct, detail, view, close, setClose, cart, setCart, addtocart, isAuthenticated, loginWithRedirect, userId}) => {
  return (
    <>
    <Routes>
        <Route path='/sign-in' element={<Signup/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/' element={<Home detail={detail} view={view} close={close} setClose={setClose} addtocart={addtocart}/>}/>
        <Route path='/product' element={<Product product={product} setProduct={setProduct} detail={detail} view={view} close={close} setClose={setClose} addtocart={addtocart} isAuthenticated={isAuthenticated} loginWithRedirect={loginWithRedirect}/>} />
        <Route path='/cart/get-cart/:userId' element={<Cart cart={cart} setCart={setCart} userId={userId}/>} />
        <Route path='/contact' element={<Contact />} />
    </Routes>
    </>
  )
}

export default Rout