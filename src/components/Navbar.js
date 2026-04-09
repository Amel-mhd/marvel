import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const styles = {
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 60px',
      backgroundColor: '#111',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    },
    logo: {
      height: '40px',
      objectFit: 'contain',
    },
    links: {
      display: 'flex',
      gap: '40px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    link: {
      textDecoration: 'none',
      fontSize: '13px',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      transition: 'color 0.3s',
    },
  };

  const getColor = (path) => location.pathname === path ? '#E62429' : 'rgba(255,255,255,0.5)';

  return (
    <nav style={styles.nav}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
        alt="Marvel"
        style={styles.logo}
      />
      <ul style={styles.links}>
        <li><Link to="/" style={{ ...styles.link, color: getColor('/') }}>Personnages</Link></li>
        <li><Link to="/comics" style={{ ...styles.link, color: getColor('/comics') }}>Comics</Link></li>
        <li><Link to="/favorites" style={{ ...styles.link, color: getColor('/favorites') }}>Favoris ❤️</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;