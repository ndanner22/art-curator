import React from "react";

const ArtworkItem = ({ artwork }) => {
  return (
    <div>
      <img src={artwork.image} alt={artwork.title} />
      <h3>{artwork.title}</h3>
      <p>{artwork.artist}</p>
    </div>
  );
};

export default ArtworkItem;
