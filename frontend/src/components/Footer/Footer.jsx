import React from 'react';
import { FaTwitter, FaYoutube, FaFacebookF,FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    return (
        <footer className="foot" id="contactus">
            <div className="footer-nav">
                <a href="#">About us</a>
                <a href="#">Contact</a>
                <a href="#">Jobs</a>
                <a href="#">Press kit</a>
            </div>
            <div className="footer-icons">
                <a ><FaTwitter /></a>
                <a id='youtube'><FaYoutube /></a>
                <a><FaFacebookF /></a>
                <a id='insta'><FaInstagram/></a>
            </div>
            <div className="footer-icons addre">
                <p>Our Contact No : <span>6264339006</span></p>
                <p>Our Mail id : <span>nakodacake@gmail.com</span> </p>
            </div>
            <aside className="footer-copyright">
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by Nakoda cake</p>
            </aside>
        </footer>
    );
}

export default Footer;
