import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <span>Welcome to Home Page</span>
    <br />
    <br />
    <Link to="/app/travel/counter">Go to Counter</Link>
  </div>
);

export default Home;
