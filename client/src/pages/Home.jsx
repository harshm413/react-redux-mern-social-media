import React from 'react';
import PostSide from '../components/PostSide/PostSide';
import ProfileSide from '../components/ProfileSide/ProfileSide';
import RightSide from '../components/RightSide/RightSide';
import './Home.css';

const Home = () => {
    return (
        <div className="Home">
            {/* Profile Section */}
            <ProfileSide />

            {/* Posts Section */}
            <PostSide />

            {/* Right Section */}
            <RightSide />
        </div>
    );
};

export default Home;
