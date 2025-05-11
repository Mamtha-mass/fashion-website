import React, { useState } from 'react'
import { FaTruckMoving } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlineUser } from 'react-icons/ai';
import { CiLogin } from 'react-icons/ci';
import { CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import logo from './logo.svg';
import './nav.css'
const Nav = ({searchbtn, userId}) => {
    const [search, setSearch] = useState()
    const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0();
  return (
    <>
    <div className='free'>
            <div className='icon'>
            <FaTruckMoving /> 
            </div>
            <p>FREE Shipping when shopping upto Rs.1000</p>
    </div>
    <div className='main_header'>
        <div className='container'>
            <div className='logo'>
                <img src={logo} alt='logo'></img>
            </div>
            
            <div className='icon'>
                {
                    isAuthenticated &&
                    (
                        <div className='account'>
                        <div className='user_icon'>
                        <AiOutlineUser />
                        </div>
                        <p>Hello, {user.name}</p>
                    </div>
                    )
                }
                <div className='second_icon'>
                <Link to="/" className='link'><AiOutlineHeart /></Link>
                <Link to={`/cart/get-cart/${userId}`} className='link'><BsBagCheck /></Link>
                </div>
            </div>
        </div>
    </div>
    
        
    
    </>
  )
}

export default Nav