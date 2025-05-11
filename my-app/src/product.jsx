import React from 'react';
import { AiOutlineShoppingCart, AiOutlineHeart, AiOutlineCloseCircle } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import Productdetail from './productdetail';
import './product.css';

const Product = ({ product, setProduct, detail, view, close, setClose, addtocart, isAuthenticated, loginWithRedirect }) => {

  const filterProduct = (category) => {
    const update = Productdetail.filter((x) => x.Cat === category);
    setProduct(update);
  };

  const allProducts = () => {
    setProduct(Productdetail);
  };

  return (
    <>
      {close && (
        <div className="product_detail">
          <div className="container">
            <button onClick={() => setClose(false)} className="closebtn">
              <AiOutlineCloseCircle />
            </button>
            {detail.map((curElm) => (
              <div className="productbox" key={curElm.id}>
                <div className="img-box">
                  <img src={curElm.Img} alt={curElm.Title} />
                </div>
                <div className="detail">
                  <h4>{curElm.Cat}</h4>
                  <h2>{curElm.Title}</h2>
                  <p>
                    A Screen Everyone Will Love: Whether your family is streaming or video
                    chatting with friends tablet A8...
                  </p>
                  <h3>{curElm.Price}</h3>
                  <button>Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="products">
        <h2># Products</h2>
        <p>Home . products</p>
        <div className="container">
          <div className="filter">
            <div className="categories">
              <h3>Categories</h3>
              <ul>
                <li onClick={allProducts}>All Products</li>
                <li onClick={() => filterProduct('Men')}>Men</li>
                <li onClick={() => filterProduct('Female')}>Female</li>
                <li onClick={() => filterProduct('Children')}>Children</li>
                <li onClick={() => filterProduct('Unisex')}>Unisex</li>
                <li onClick={() => filterProduct('Other')}>Other</li>
              </ul>
            </div>
          </div>

          <div className="productbox">
            <div className="contant">
              {product.map((curElm) => (
                <div className="box" key={curElm.id}>
                  <div className="img_box">
                    <img src={curElm.Img} alt={curElm.Title} />
                    <div className="icon">
                      <li onClick={() => (isAuthenticated ? addtocart(curElm) : loginWithRedirect())}>
                        <AiOutlineShoppingCart />
                      </li>
                      <li onClick={() => view(curElm)}><BsEye /></li>
                      <li><AiOutlineHeart /></li>
                    </div>
                  </div>
                  <div className="detail">
                    <p>{curElm.Cat}</p>
                    <h3>{curElm.Title}</h3>
                    <h4>${curElm.Price}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
