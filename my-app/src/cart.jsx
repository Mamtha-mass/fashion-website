import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './cart.css'
import axios from 'axios';

const Cart = ({cart, setCart, userId}) => {
  const [qty, setQty] = useState({});

  const initializeQty = (cart) => {
  const initialQty = {};
  cart.forEach(item => {
    initialQty[item.id] = item.qty;
  });
  setQty(initialQty);
};

    // increace qty
    const incqty = async (product) => 
    {
        try {
            const response = await axios.post('http://localhost:8087/cart/update-cart/increase', {
            userId: user.uid,
            productId: product.id,
        });

        if (response.status === 200) {
      // Re-fetch the cart to update the state
      const cartResponse = await axios.get(`http://localhost:8087/cart/get-cart/${user.uid}`);
      const fullProducts = cartResponse.data.map(item => ({
        ...item.product,
        qty: item.qty,
      }));
      setCart(fullProducts);
    }
  } catch (error) {
    console.error('Error increasing quantity:', error);
  }
        
    }

    // Dec Qty
    const decqty = async (product) => 
    {
        try {
            const response = await axios.post('http://localhost:8087/cart/update-cart/decrease', {
            userId: user.uid,
            productId: product.id,  }
        );  

        if (response.status === 200) {
            // Re-fetch the cart to update the state
            const cartResponse = await axios.get(`http://localhost:8087/cart/get-cart/${user.uid}`);
            const fullProducts = cartResponse.data.map(item => ({
                ...item.product,
                qty: item.qty,
        }));
        setCart(fullProducts);

        } 
    } catch {
            console.error('Error decreasing quantity:', error);
        }
    }
    //Remove cart product
    const removeproduct = async (product) => {
  try {
    const response = await axios.delete(
      `http://localhost:8087/cart/remove-from-cart/${user.uid}/${product.id}`
    );

    if (response.status === 200) {
      // Re-fetch the cart after successful deletion
      const cartResponse = await axios.get(`http://localhost:8087/cart/get-cart/${user.uid}`);
      const fullProducts = cartResponse.data.map(item => ({
        ...item.product,
        qty: item.qty,
      }));
      setCart(fullProducts);
    }
  } catch (error) {
    console.error('Error removing product from cart:', error);
  }
};

    // Total price
    const Totalprice = cart.reduce((price, item) => price + item.qty * item.Price, 0)
    //console.log(`printing cart: ${cart}`); 
  return (
    
    <>
    <div className='cartcontainer'>
        {cart.length === 0 && 
        <div className='emptycart'>
        <h2 className='empty'>Cart is Empty</h2>
        <Link to='/product' className='emptycartbtn'>Shop Now</Link>
        </div>
        }
        <div className='contant'>
            {
                cart.map((curElm) => 
                {
                    return(
                        <div className='cart_item' key={curElm.id}>
                            <div className='img_box'>
                                <img src={curElm.Img} alt={curElm.Title}></img>
                            </div>
                            <div className='detail'>
                                <div className='info'>
                                <h4>{curElm.Cat}</h4>
                                <h3>{curElm.Title}</h3>
                                <p>Price: ${curElm.Price}</p>
                                <div className='qty'>
                                    <button className='incqty' onClick={() => incqty(curElm)}>+</button>
                                    <input
                                      type='text'
                                      value={qty[curElm.id] || curElm.qty}
                                      onChange={(e) => {
                                        const newQty = e.target.value;
                                        setQty({ ...qty, [curElm.id]: newQty });
                                      }}
                                    />
                                    <button className='decqty' onClick={() => decqty(curElm)}>-</button>
                                </div>
                                <h4 className='subtotal'>sub total: ${
                                  curElm.Price
                                    ? parseInt(curElm.Price.toString().replace(/[^\d]/g, '')) * curElm.qty
                                    : 0
                                }</h4>
                                </div>
                                <div className='close'>
                                <button onClick={() => removeproduct(curElm)}><AiOutlineClose /></button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {
            cart.length > 0 &&
            <>
            <h2 className='totalprice'>total: $ {Totalprice}</h2>
            <button className='checkout'>Checkout</button>
            </>
        }
    </div>
    </>
  )
}

export default Cart