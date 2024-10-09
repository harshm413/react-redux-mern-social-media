import React, { useState } from 'react';
import './RightSide.css';

import TrendCard from '../TrendCard/TrendCard'; // Trending topics or content card
import ShareModal from '../ShareModal/ShareModal'; // Modal for sharing content
import NavIcons from '../NavIcons/NavIcons'; // Navigation icons for the sidebar

const RightSide = () => {
    // State for handling the modal visibility (share content modal)
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className="RightSide">
            {/* Navigation Icons */}
            <NavIcons />

            {/* Trending Topics or Content */}
            <TrendCard />
        </div>
    );
};

export default RightSide;
