import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
  return (
    <div className="Footer">
      <h4>@ShopEZ - One Destination for all your needs....</h4>
      <div className="footer-body">

        <ul>
          <li>Home</li>
          <li>Categories</li>
          <li>All products</li>
        </ul>

        <ul>
          <li>Cart</li>
          <li>Profile</li>
          <li>Orders</li>
        </ul>

        <ul>
          <li>Electronics</li>
          <li>Mobiles</li>
          <li>Laptops</li>
        </ul>

        <ul>
          <li>Fashion</li>
          <li>Grocery</li>
          <li>Sports</li>
        </ul>


      </div>
      <div className="footer-bottom">
        <p>@ ShopEZ.com - All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer