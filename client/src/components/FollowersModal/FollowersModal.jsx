import React from 'react';
import FollowersCard from '../FollowersCard/FollowersCard';

const FollowersModal = ({ modalOpened, setModalOpened }) => {
    const closeModal = () => setModalOpened(false);

    return (
        <div
            className={`modal-overlay ${modalOpened ? 'show' : ''}`}
            onClick={closeModal}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <FollowersCard location="modal" />
                <button className="modal-close" onClick={closeModal}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default FollowersModal;
