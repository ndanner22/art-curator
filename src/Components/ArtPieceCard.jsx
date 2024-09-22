import React from "react";

const ArtPieceCard = ({ artWork, addToCollection }) => {
  return (
    <div className="artwork">
      <img src={artWork.primaryImageSmall} alt={artWork.title} width="200px" />
      <h3>{artWork.title}</h3>
      <p>Artist: {artWork.artistDisplayName}</p>
      <button onClick={() => addToCollection(artWork)}>
        Add to Collection
      </button>
    </div>
  );
};

export default ArtPieceCard;
