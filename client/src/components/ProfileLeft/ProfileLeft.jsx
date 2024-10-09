import React from 'react';
import FollowersCard from '../FollowersCard/FollowersCard';
import InfoCard from '../InfoCard/InfoCard';
import LogoSearch from '../LogoSearch/LogoSearch';

const ProfileLeft = () => {
    return (
        <div className="ProfileSide">
            {/* Logo and Search Bar Section */}
            <LogoSearch />

            {/* User Info Section */}
            <InfoCard />

            {/* Followers/Following Section
            <FollowersCard /> */}
        </div>
    );
};

export default ProfileLeft;
