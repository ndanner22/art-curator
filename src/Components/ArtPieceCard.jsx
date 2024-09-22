import React from "react";

const ArtworkItem = ({ artwork, addToCollection }) => {
  return (
    <div>
      <img src={artwork.image} alt={artwork.title} />
      <h3>{artwork.title}</h3>
      <p>{artwork.artist}</p>
      <button onClick={() => addToCollection(artwork)}>
        Add to Collection
      </button>
    </div>
  );
};

export default ArtworkItem;
