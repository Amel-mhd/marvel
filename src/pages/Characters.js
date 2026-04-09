import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_KEY = '8i8n1nxokcOidIB7';

function Characters() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites') || '[]'));

  const fetchCharacters = async () => {
  try {
    setLoading(true);
    const res = await axios.get(`https://marvel-backend-1.onrender.com/characters`, {
      params: {
        apiKey: API_KEY,
        limit: 100,
        skip: (page - 1) * 100,
        name: search || undefined,
      },
    });
    console.log(res.data);
    setCharacters(res.data.results);
    setTotal(res.data.count);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCharacters();
  };

  const toggleFavorite = (character) => {
    const isFav = favorites.some((f) => f._id === character._id);
    const updated = isFav
      ? favorites.filter((f) => f._id !== character._id)
      : [...favorites, character];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some((f) => f._id === id);

  return (
    <div style={{ padding: '40px 60px', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <h1 style={{
        fontSize: '42px',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '8px',
        letterSpacing: '-1px',
      }}>
        PERSONNAGES
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '32px' }}>
        {total} personnages Marvel
      </p>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
        <input
          type="text"
          placeholder="Rechercher un personnage..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            maxWidth: '400px',
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            padding: '12px 16px',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#E62429',
          color: '#fff',
          border: 'none',
          padding: '12px 24px',
          fontSize: '13px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          Rechercher
        </button>
      </form>

      {loading ? (
        <div style={{ color: '#fff', textAlign: 'center', marginTop: '80px', fontSize: '18px' }}>
          Chargement...
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {characters.map((character) => (
              <div
                key={character._id}
                style={{
                  backgroundColor: '#1a1a1a',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <div onClick={() => navigate(`/character/${character._id}`)}>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '12px' }}>
                    <p style={{
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '4px',
                    }}>
                      {character.name}
                    </p>
                    <p style={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: '12px',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {character.description || 'Aucune description'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(character)}
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
                  {isFavorite(character._id) ? '❤️' : '🤍'}
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                backgroundColor: page === 1 ? '#333' : '#E62429',
                color: '#fff',
                border: 'none',
                padding: '10px 24px',
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                fontSize: '13px',
              }}
            >
              Précédent
            </button>
            <span style={{ color: '#fff', padding: '10px 16px', fontSize: '13px' }}>
              Page {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              style={{
                backgroundColor: '#E62429',
                color: '#fff',
                border: 'none',
                padding: '10px 24px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Characters;