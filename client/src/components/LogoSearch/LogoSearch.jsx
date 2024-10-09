import React from 'react';
import Logo from '../../img/logo.png';
import './LogoSearch.css';

const LogoSearch = () => {
    return (
        <div className="LogoSearch">
            <img src={Logo} alt="Logo" />
            <div className="Search">
                <input type="text" placeholder="#Explore" />
                <div className="s-icon">
                    {/* Simple search icon using an SVG */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm4 0l5 5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default LogoSearch;
