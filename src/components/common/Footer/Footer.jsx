import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import './footer.css'

function Footer() {
  return (
    <footer>
      <div className="col">
        <h4>Contact</h4>
        <p><strong>Address:</strong> Aptech Rumuomasi</p>
        <p><strong>Phone:</strong> 09046807203</p>
        <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
        <div className="follow">
          <h4>Follow us</h4>
          <div className="icon">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>
      <div className="col">
        <h4>About</h4>
        <a href="#">About us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>
      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">My wishlist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>
      <div className="copyright">2023 @ All Rights Reserved</div>
    </footer>
  );
}

export default Footer;
