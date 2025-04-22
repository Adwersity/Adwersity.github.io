import React from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = ({ user }) => {
  return (
    <header>
      <div className="header-content">
        <div className="header-text">
          <span>Ticket</span>Hub
        </div>
        <nav>
          <ul className="main-nav">
            <li><Link to="/">Події</Link></li>
            <li><Link to="/bookings">Мої бронювання</Link></li>
            <li><Link to="/about">Про нас</Link></li>

            <div className="auth-section">
              {user ? (
                <>
                  <span className="user-email">{user.email}</span>
                  <button onClick={() => signOut(auth)} className="logout-button">Вихід</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="auth-button login">Увійти</Link>
                  <Link to="/register" className="auth-button register">Реєстрація</Link>
                </>
              )}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
