import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Character() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await axios.get(`https://marvel-backend-1.onrender.com/character/${id}`);
        setCharacter(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div style={{ color: '#fff', textAlign: 'center', marginTop: '80px', fontSize: '18px' }}>
        Chargement...
      </div>
    );
  }

  if (!character) return null;

  return (
    <div style={{ padding: '40px 60px', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          padding: '10px 20px',
          cursor: 'pointer',
          fontSize: '13px',
          letterSpacing: '1px',
          marginBottom: '40px',
        }}
      >
        Retour
      </button>

      <div style={{
        display: 'flex',
        gap: '60px',
        marginBottom: '60px',
        alignItems: 'flex-start',
      }}>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          style={{
            width: '300px',
            height: '400px',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div>
          <p style={{
            fontSize: '11px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#E62429',
            marginBottom: '16px',
          }}>
            Personnage Marvel
          </p>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#fff',
            letterSpacing: '-1px',
            marginBottom: '24px',
          }}>
            {character.name}
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: '1.8',
            maxWidth: '500px',
          }}>
            {character.description || 'Aucune description disponible.'}
          </p>
        </div>
      </div>

      <h2 style={{
        fontSize: '28px',
        fontWeight: '700',
        color: '#fff',
        marginBottom: '8px',
        letterSpacing: '-1px',
      }}>
        COMICS
      </h2>
      <p style={{
        color: 'rgba(255,255,255,0.4)',
        fontSize: '13px',
        marginBottom: '32px',
      }}>
        {character.comics.length} comics
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '20px',
      }}>
        {character.comics.map((comic) => (
          <div
            key={comic._id}
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            {comic.thumbnail && (
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '12px' }}>
              <p style={{
                color: '#fff',
                fontSize: '13px',
                fontWeight: '600',
                lineHeight: '1.4',
              }}>
                {comic.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Character;