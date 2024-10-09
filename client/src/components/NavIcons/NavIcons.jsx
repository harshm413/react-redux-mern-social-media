import React from 'react';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import './NavIcons.css';
import { Link } from 'react-router-dom';

// Replace UilSetting with an SVG icon
const NavIcons = () => {
    return (
        <div className="navIcons">
            <Link to="../home">
                <img src={Home} alt="Home" />
            </Link>

            <img src={Noti} alt="Notification" />
            <img src={Comment} alt="Chat" />
        </div>
    );
};

export default NavIcons;
