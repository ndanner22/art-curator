import { useState } from "react";
import CollectionArtPieceCard from "./CollectionArtPieceCard";
import "../App.css";

const Collection = ({ artworks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevArtWork = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
    );
  };

  const nextArtWork = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
    );
  };
  const jumpToArtWork = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <h2>Your Personal Collection!</h2>

      {artworks.length === 0 ? (
        <p>Your collection is currently empty.</p>
      ) : (
        <div>
          <div className="collection-display">
            <button onClick={prevArtWork} className="arrow left-arrow">
              ◀
            </button>
            {artworks[currentIndex] && (
              <CollectionArtPieceCard artWork={artworks[currentIndex]} />
            )}
            <button onClick={nextArtWork} className="arrow right-arrow">
              ▶
            </button>
          </div>
        </div>
      )}
      <div className="thumbnails">
        {artworks.map((artWork, index) => (
          <img
            key={artWork.id}
            src={artWork.image}
            alt={artWork.title}
            className={`thumbnail ${currentIndex === index ? "active" : ""}`}
            onClick={() => jumpToArtWork(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
