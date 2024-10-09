import React from 'react';
import './ProfileCard.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileCard = ({ location }) => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts);
    const serverPublic = 'http://localhost:5000/images/';

    // Helper function to render fallback images
    const getImage = (image, defaultImage) => {
        return image ? serverPublic + image : serverPublic + defaultImage;
    };

    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img
                    src={getImage(user.coverPicture, 'defaultCover.jpg')}
                    alt="CoverImage"
                />
                <img
                    src={getImage(user.profilePicture, 'defaultProfile.png')}
                    alt="ProfileImage"
                />
            </div>

            <div className="ProfileName">
                <span>
                    {user.firstname} {user.lastname}
                </span>
                <span>{user.worksAt || 'No workplace info available'}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span>Following</span>
                    </div>

                    {location === 'profilePage' && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>
                                    {
                                        posts.filter(
                                            (post) => post.userId === user._id
                                        ).length
                                    }
                                </span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>

            {location !== 'profilePage' && (
                <span>
                    <Link
                        to={`/profile/${user._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        My Profile
                    </Link>
                </span>
            )}
        </div>
    );
};

export default ProfileCard;
