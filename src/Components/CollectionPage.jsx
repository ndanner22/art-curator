import { useState } from "react";
import CollectionArtPieceCard from "./CollectionArtPieceCard";
import "../App.css";

const Collection = ({ artworks }) => {
  // State to track the index of the currently displayed artwork. This is for the display 'carousel'
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to navigate to previous piece of art in collection.
  const prevArtWork = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artworks.length - 1 : prevIndex - 1
    );
  };

  // Function to navigate to next piece of art in collection.
  const nextArtWork = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to jump to specific piece of art when thumbnail is clicked.
  const jumpToArtWork = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <h2>Your Personal Collection!</h2>

      {/* If the collection is empty, show a message. Otherwise, show the artwork display. */}
      {artworks.length === 0 ? (
        <p>Your collection is currently empty.</p>
      ) : (
        <div>
          {/* Display the art along with navigation arrows */}
          <div className="collection-display">
            <button onClick={prevArtWork} className="arrow left-arrow">
              ◀
            </button>
            {/* Display currently selected piece of art using the CollectionArtPieceCard component and pass it the current piece of art as a prop*/}
            {artworks[currentIndex] && (
              <CollectionArtPieceCard artWork={artworks[currentIndex]} />
            )}
            <button onClick={nextArtWork} className="arrow right-arrow">
              ▶
            </button>
          </div>
        </div>
      )}
      {/* Display thumbnails for all artworks in the collection, with the active one highlighted */}
      <div className="thumbnails">
        {artworks.map((artWork, index) => (
          <img
            key={artWork.id} // Use the artwork ID as the unique key
            src={artWork.image}
            alt={artWork.title} // Add an alt attribute for accessibility
            className={`thumbnail ${currentIndex === index ? "active" : ""}`} // Highlight the active thumbnail
            onClick={() => jumpToArtWork(index)} // Set the current index when thumbnail is clicked
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
