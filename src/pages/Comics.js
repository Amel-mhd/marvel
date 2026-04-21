import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import SearchInput from '../components/SearchInput';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import api from '../api';
import './Comics.css';

function Comics() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  const fetchComics = async (currentPage, currentSearch) => {
    try {
      setLoading(true);
      const data = await api({
        route: '/comics',
        params: {
          limit: 100,
          skip: (currentPage - 1) * 100,
          title: currentSearch || undefined,
        },
      });
      setComics(data.results);
      setTotal(data.count);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComics(page, search);
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchComics(1, search);
  };

  const toggleFavorite = (comic) => {
    const isFav = favorites.some((f) => f._id === comic._id);
    const updated = isFav
      ? favorites.filter((f) => f._id !== comic._id)
      : [...favorites, { ...comic, type: 'comic' }];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const isFavorite = (id) => favorites.some((f) => f._id === id);

  return (
    <div className="page">
      <h1 className="page__title">COMICS</h1>
      <p className="page__count">{total} comics Marvel</p>

      <SearchInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSubmit={handleSearch}
        placeholder="Rechercher un comic..."
      />

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <>
          <div className="grid">
            {comics.map((comic) => (
              <Card
                key={comic._id}
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                title={comic.title}
                description={comic.description}
                isFavorite={isFavorite(comic._id)}
                onFavoriteClick={() => toggleFavorite(comic)}
                tall
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

export default Comics;