import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import AuctionItemPage from './pages/AuctionItem';
import UserProfilePage from './pages/UserProfile';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/auction/:id" component={AuctionItemPage} />
                <Route path="/profile" component={UserProfilePage} />
            </Switch>
        </Router>
    );
}

export default App;
