import React from 'react';
import { Link } from 'react-router-dom';
import { URL } from '../constants';

const Home = () => (
  <div>
    <span>Welcome to Home Page</span>
    <br />
    <br />
    <Link to={URL.TRAVEL_COUNTER}>Go to Counter</Link>
  </div>
);

export default Home;
