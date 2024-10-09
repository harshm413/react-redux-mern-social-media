import React from 'react';
import PostShare from '../PostShare/PostShare'; // The post sharing component

const ShareModal = ({ modalOpened, setModalOpened }) => {
    return (
        <div className={`modal-container ${modalOpened ? 'open' : ''}`}>
            <div
                className="modal-overlay"
                onClick={() => setModalOpened(false)}
            ></div>
            <div className="modal-content">
                <PostShare />
                <button
                    className="close-button"
                    onClick={() => setModalOpened(false)}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default ShareModal;
