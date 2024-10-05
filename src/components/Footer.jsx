import React from 'react';
import '../assets/styles/Footer.css' // Import CSS file for styling

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer">
            <p>&copy; {currentYear} ReviewBoard. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

