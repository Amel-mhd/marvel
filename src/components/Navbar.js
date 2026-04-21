import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
          alt="Marvel"
          className="navbar__logo-img"
        />
      </Link>
      <ul className="navbar__links">
        <li>
          <Link
            to="/"
            className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
          >
            Personnages
          </Link>
        </li>
        <li>
          <Link
            to="/comics"
            className={`navbar__link ${isActive('/comics') ? 'navbar__link--active' : ''}`}
          >
            Comics
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            className={`navbar__link ${isActive('/favorites') ? 'navbar__link--active' : ''}`}
          >
            Favoris ❤️
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;