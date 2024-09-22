import { useState } from "react";
import ArtPieceCard from "./ArtPieceCard";
import { searchMetArtworks } from "../Utils/api";

const ArtWorks = ({ addToCollection }) => {
  const [search, setSearch] = useState("");
  const [artWorks, setArtWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    searchMetArtworks(search)
      .then((results) => {
        setArtWorks(results);
      })
      .catch((err) => {
        console.error("Failed to fetch artworks:", err);
        setError("Failed to fetch artworks. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for art..."
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading artworks...</p>}

      {error && <p>{error}</p>}

      <div>
        {artWorks.map((artWork) => (
          <ArtPieceCard
            key={artWork.objectID}
            artWork={artWork}
            addToCollection={addToCollection}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtWorks;
