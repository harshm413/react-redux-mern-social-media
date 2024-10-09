import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/UserAction';

const User = ({ person }) => {
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();

    // Initially check if the person is followed by the current user
    const [following, setFollowing] = useState(
        person.followers.includes(user._id)
    );

    useEffect(() => {
        // When the component mounts, set the initial state of following correctly
        setFollowing(person.followers.includes(user._id));
    }, [person.followers, user._id]);

    const handleFollow = () => {
        if (following) {
            dispatch(unfollowUser(person._id, user));
        } else {
            dispatch(followUser(person._id, user));
        }
        setFollowing((prev) => !prev); // Update the local state after dispatching the action
    };

    return (
        <div className="follower">
            <div>
                <img
                    src={
                        person.profilePicture
                            ? publicFolder + person.profilePicture
                            : publicFolder + 'defaultProfile.png'
                    }
                    alt="profile"
                    className="followerImage"
                />
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>@{person.username}</span>
                </div>
            </div>
            <button
                className={`button fc-button ${
                    following ? 'UnfollowButton' : ''
                }`}
                onClick={handleFollow}
            >
                {following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
};

export default User;
