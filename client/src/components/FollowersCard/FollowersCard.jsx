import React, { useEffect, useState } from 'react';
import './FollowersCard.css';
import FollowersModal from '../FollowersModal/FollowersModal';
import { getAllUser } from '../../api/UserRequests';
import User from '../User/User';
import { useSelector } from 'react-redux';

const FollowersCard = ({ location }) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useSelector((state) => state.authReducer.authData);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const { data } = await getAllUser();
                setPersons(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load persons. Please try again later.');
                setLoading(false);
            }
        };
        fetchPersons();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="FollowersCard">
            <h3>People you may know</h3>

            {persons.length === 0 ? (
                <p>No users available.</p>
            ) : (
                persons.map((person) => {
                    if (person._id !== user._id) {
                        return <User person={person} key={person._id} />;
                    }
                    return null;
                })
            )}

            {/* Conditionally render the "Show more" button only if 'location' is not passed */}
            {location && (
                <span
                    onClick={() => setModalOpened(true)}
                    style={{ cursor: 'pointer' }}
                >
                    Show more
                </span>
            )}

            <FollowersModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
            />
        </div>
    );
};

export default FollowersCard;
