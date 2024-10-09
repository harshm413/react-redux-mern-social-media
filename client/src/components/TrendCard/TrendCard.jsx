import React from 'react';
import './TrendCard.css';
import { TrendData } from '../../Data/TrendData.js';

const TrendCard = () => {
    return (
        <div className="TrendCard">
            <h3>Trends for You</h3>

            {/* Conditional rendering for empty data */}
            {TrendData.length === 0 ? (
                <p>No trends available at the moment.</p>
            ) : (
                TrendData.map((trend, id) => {
                    return (
                        <div className="trend" key={id}>
                            <span className="trend-name">#{trend.name}</span>
                            <span className="trend-shares">
                                {trend.shares}k shares
                            </span>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default TrendCard;
