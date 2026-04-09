import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Characters from './pages/Characters';
import Character from './pages/Character';
import Comics from './pages/Comics';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;