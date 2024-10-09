import React from 'react';
import PostSide from '../../components/PostSide/PostSide';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import RightSide from '../../components/RightSide/RightSide';
import './Profile.css';

const Profile = () => {
    return (
        <div className="Profile">
            {/* Left side with profile details */}
            <ProfileLeft />

            {/* Center section with profile card and posts */}
            <div className="Profile-center">
                <ProfileCard location="profilePage" />
                <PostSide />
            </div>

            {/* Right side with additional info or actions */}
            <RightSide />
        </div>
    );
};

export default Profile;
