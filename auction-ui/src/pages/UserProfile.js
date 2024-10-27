import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfilePage = () => {
    const [userInfo, setUserInfo] = useState({});
    const [userItems, setUserItems] = useState([]);
    const [userBids, setUserBids] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const userResponse = await axios.get('/api/users/me');
            setUserInfo(userResponse.data);

            const itemsResponse = await axios.get('/api/users/items');
            setUserItems(itemsResponse.data);

            const bidsResponse = await axios.get('/api/users/bids');
            setUserBids(bidsResponse.data);
        };
        fetchUserProfile();
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            <h2>{userInfo.username}</h2>
            <p>Email: {userInfo.email}</p>

            <h2>Your Auction Items</h2>
            <ul>
                {userItems.map(item => (
                    <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Current Bid: ${item.currentBid}</p>
                    </li>
                ))}
            </ul>

            <h2>Your Bids</h2>
            <ul>
                {userBids.map(bid => (
                    <li key={bid.id}>
                        Bid on Item ID {bid.auctionItemId}: ${bid.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfilePage;
