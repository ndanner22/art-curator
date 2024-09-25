import React from "react";

const Collection = ({ artworks }) => {
  return (
    <div>
      <h2>Your Personal Collection!</h2>
      <div className="art-grid">
        {artworks.map((artWork) => (
          <div key={artWork.id}>
            <img src={artWork.image} alt={artWork.title} width="200px" />
            <h3>{artWork.title}</h3>
            <p>Artist: {artWork.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
