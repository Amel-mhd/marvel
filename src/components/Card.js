import React from 'react';
import './Card.css';

function Card({ image, title, description, isFavorite, onFavoriteClick, onClick, tall }) {
  if (!image) return null;

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/200x220/1a1a1a/666666?text=No+Image';
  };

  return (
    <div className="card" onClick={onClick}>
      <img
        src={image}
        alt={title}
        className={`card__image ${tall ? 'card__image--tall' : ''}`}
        onError={handleImageError}
      />
      <div className="card__body">
        <p className="card__title">{title}</p>
        {description && (
          <p className="card__description">{description}</p>
        )}
      </div>
      {onFavoriteClick && (
        <button
          className="card__favorite"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteClick();
          }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}
    </div>
  );
}

export default Card;