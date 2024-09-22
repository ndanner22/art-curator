import React, { useState } from "react";
import ArtworkItem from "./ArtworkItem";
import { searchMetArtworks } from "../api";

const ArtWorks = () => {
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
        {artWorks.map((artwork) => (
          <ArtworkItem key={artwork.objectID} artwork={artwork} />
        ))}
      </div>
    </div>
  );
};

export default ArtWorks;
