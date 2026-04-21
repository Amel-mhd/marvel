import React from 'react';
import './Card.css';

function Card({ image, title, description, isFavorite, onFavoriteClick, onClick, tall }) {
  return (
    <div className="card" onClick={onClick}>
      <img
        src={image}
        alt={title}
        className={`card__image ${tall ? 'card__image--tall' : ''}`}
      />
      <div className="card__body">
        <p className="card__title">{title}</p>
        {description && (
          <p className="card__description">
            {description || 'Aucune description'}
          </p>
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