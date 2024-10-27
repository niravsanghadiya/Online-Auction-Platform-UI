import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.get('/api/auction-items');
            setItems(response.data);
            setLoading(false);
        };
        fetchItems();
    }, []);

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Auction Items</h1>
            <input
                type="text"
                placeholder="Search auction items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {filteredItems.map(item => (
                        <li key={item.id}>
                            <h2>{item.title}</h2>
                            <p>Current Bid: ${item.currentBid}</p>
                            <a href={`/auction/${item.id}`}>View Details</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
