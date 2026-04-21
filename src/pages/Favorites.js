import React, { useState } from 'react';
import Card from '../components/Card';

function Favorites() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  );

  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f._id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const getImage = (item) => {
    if (item.thumbnail?.path) {
      return `${item.thumbnail.path}.${item.thumbnail.extension}`;
    }
    return null;
  };

  return (
    <div className="page">
      <h1 className="page__title">FAVORIS</h1>
      <p className="page__count">
        {favorites.length} élément{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
      </p>

      {favorites.length === 0 ? (
        <div className="empty">
          <p className="empty__icon">❤️</p>
          <p className="empty__text">Aucun favori pour l'instant</p>
        </div>
      ) : (
        <div className="grid">
          {favorites.map((item) => (
            <Card
              key={item._id}
              image={getImage(item)}
              title={item.name || item.title}
              description={item.type === 'comic' ? 'Comic' : 'Personnage'}
              isFavorite={true}
              onFavoriteClick={() => removeFavorite(item._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;