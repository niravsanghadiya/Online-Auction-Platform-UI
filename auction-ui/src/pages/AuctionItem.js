import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuctionItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [bidHistory, setBidHistory] = useState([]);
    const [bidAmount, setBidAmount] = useState('');

    useEffect(() => {
        const fetchItemDetails = async () => {
            const itemResponse = await axios.get(`/api/auctionitem/${id}`);
            setItem(itemResponse.data);
            const bidsResponse = await axios.get(`/api/bid/auction/${id}/bids`);
            setBidHistory(bidsResponse.data);
        };
        fetchItemDetails();
    }, [id]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/bid/post-bid', {
            auctionItemId: item.id,
            amount: bidAmount
        });
        // Refresh bid history after placing a bid
        const bidsResponse = await axios.get(`/api/bid/auction/${id}/bids`);
        setBidHistory(bidsResponse.data);
    };

    if (!item) return <p>Loading...</p>;

    return (
        <div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>Starting Bid: ${item.startingBid}</p>
            <p>Current Bid: ${item.currentBid}</p>

            <h2>Bid History</h2>
            <ul>
                {bidHistory.map(bid => (
                    <li key={bid.id}>
                        ${bid.amount} - {new Date(bid.bidTime).toLocaleString()}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleBidSubmit}>
                <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid"
                    required
                />
                <button type="submit">Place Bid</button>
            </form>
        </div>
    );
};

export default AuctionItemPage;
