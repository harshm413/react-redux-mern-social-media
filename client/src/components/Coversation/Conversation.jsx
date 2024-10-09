import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api/UserRequests';

const Conversation = ({ data, currentUser, online }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const dispatch = useDispatch();

    // Fetch user data when the component mounts or the data changes
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUser);

        const getUserData = async () => {
            setLoading(true); // Start loading when fetching data
            try {
                const { data: userDataResponse } = await getUser(userId);
                setUserData(userDataResponse);
                dispatch({ type: 'SAVE_USER', data: userDataResponse }); // Optional if needed in global state
            } catch (error) {
                console.log(error);
                setUserData(null); // Set to null in case of error
            } finally {
                setLoading(false); // Stop loading after fetching data
            }
        };

        if (data) getUserData();
    }, [data, currentUser, dispatch]); // Add `data` and `currentUser` to dependencies

    if (loading) {
        return <div>Loading...</div>; // Show a loading state
    }

    return (
        <>
            <div className="follower conversation">
                <div>
                    {online && <div className="online-dot"></div>}
                    <img
                        src={
                            userData?.profilePicture
                                ? process.env.REACT_APP_PUBLIC_FOLDER +
                                  userData.profilePicture
                                : process.env.REACT_APP_PUBLIC_FOLDER +
                                  'defaultProfile.png'
                        }
                        alt="Profile"
                        className="followerImage"
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>
                            {userData?.firstname} {userData?.lastname}
                        </span>
                        <span style={{ color: online ? '#51e200' : '' }}>
                            {online ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>
            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </>
    );
};

export default Conversation;
