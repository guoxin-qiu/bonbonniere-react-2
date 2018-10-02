import React from 'react';
import { Link } from 'react-router-dom';
import * as Url from '../constants/Url';

const Home = () => (
  <div>
    <span>Welcome to Home Page</span>
    <br />
    <br />
    <Link to={Url.TRAVEL_COUNTER}>Go to Counter</Link>
  </div>
);

export default Home;
