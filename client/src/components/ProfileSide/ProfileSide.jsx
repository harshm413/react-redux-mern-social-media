import React from 'react';
import FollowersCard from '../FollowersCard/FollowersCard';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfileSide.css';

const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            {/* LogoSearch Component for searching users or posts */}
            <LogoSearch />

            {/* ProfileCard: Shows user profile with customized location */}
            <ProfileCard location="homepage" />

            {/* FollowersCard: Displays list of followers */}
            {/* <FollowersCard /> */}
        </div>
    );
};

export default ProfileSide;
