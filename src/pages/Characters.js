import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import SearchInput from '../components/SearchInput';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import api from '../api';
import './Characters.css';

function Characters() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  const fetchCharacters = async (currentPage, currentSearch) => {
    try {
      setLoading(true);
      const data = await api({
        route: '/characters',
        params: {
          limit: 100,
          skip: (currentPage - 1) * 100,
          name: currentSearch || undefined,
        },
      });
      setCharacters(data.results);
      setTotal(data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page, search);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCharacters(1, search);
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
    <div className="page">
      <h1 className="page__title">PERSONNAGES</h1>
      <p className="page__count">{total} personnages Marvel</p>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={handleSearch}
        placeholder="Rechercher un personnage..."
      />

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <>
          <div className="grid">
            {characters.map((character) => (
              <Card
                key={character._id}
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                title={character.name}
                description={character.description}
                isFavorite={isFavorite(character._id)}
                onFavoriteClick={() => toggleFavorite(character)}
                onClick={() => navigate(`/character/${character._id}`)}
              />
            ))}
          </div>

          <div className="pagination">
            <ButtonSecondary
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Précédent
            </ButtonSecondary>
            <span className="pagination__info">Page {page}</span>
            <ButtonPrimary onClick={() => setPage((p) => p + 1)}>
              Suivant
            </ButtonPrimary>
          </div>
        </>
      )}
    </div>
  );
}

export default Characters;