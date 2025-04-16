import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Header = () => {
  return (
    <header>
      <div className="header-text">
        <span>Ticket</span>Hub
      </div>
      <nav>
        <ul>
          <li><Link to="/">Події</Link></li>
          <li><Link to="/bookings">Мої бронювання</Link></li>
          <li><Link to="/about">Про нас</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
