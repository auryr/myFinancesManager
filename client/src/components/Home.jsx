import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
            <Link className="hero-button" to={'/register'}>Register</Link>
    </div>
  )
}

export default Home;
