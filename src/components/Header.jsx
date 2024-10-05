import React from 'react';
import '../assets/styles/Header.css' // Import CSS file for styling

const Header = () => {
    return (
        <header className="header">
            <div className="logo">Logo</div>
            <div className="sign-in">
                <a href="/signin">Sign In</a>
            </div>
        </header>
    );
};

export default Header;