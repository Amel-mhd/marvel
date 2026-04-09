import React, { useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f._id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '40px 60px', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h1 style={{
        fontSize: '42px',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '8px',
        letterSpacing: '-1px',
      }}>
        FAVORIS
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '40px' }}>
        {favorites.length} élément{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
      </p>

      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.2)', marginBottom: '12px' }}>❤️</p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
            Aucun favori pour l'instant
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}>
          {favorites.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.name || item.title}
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div style={{ padding: '12px' }}>
                <p style={{ color: '#fff', fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                  {item.name || item.title}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {item.type === 'comic' ? 'Comic' : 'Personnage'}
                </p>
              </div>
              <button
                onClick={() => removeFavorite(item._id)}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ❤️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;