import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function Character() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const data = await api({ route: `/character/${id}` });
        setCharacter(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) return <div className="loading">Chargement...</div>;
  if (!character) return null;

  return (
    <div className="page">
      <button className="character__back" onClick={() => navigate(-1)}>
        ← Retour
      </button>

      <div className="character__header">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="character__image"
        />
        <div className="character__info">
          <p className="character__label">Personnage Marvel</p>
          <h1 className="character__name">{character.name}</h1>
          <p className="character__description">
            {character.description || 'Aucune description disponible.'}
          </p>
        </div>
      </div>

      <h2 className="character__comics-title">
        COMICS <span className="character__comics-count">({character.comics.length})</span>
      </h2>

      <div className="grid">
        {character.comics.filter(c => c.thumbnail).map((comic, index) => (
          <div key={index} className="character__comic-card">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="character__comic-img"
            />
            <p className="character__comic-title">{comic.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Character;