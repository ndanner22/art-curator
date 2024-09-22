import { useState } from "react";
import ArtPieceCard from "./ArtPieceCard";
import { searchMetArtworks, searchRijksmuseumArtworks } from "../Utils/api";

const ArtWorks = ({ addToCollection }) => {
  const [search, setSearch] = useState("");
  const [artWorks, setArtWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    Promise.all([searchMetArtworks(search), searchRijksmuseumArtworks(search)])
      .then(([metResults, rijksResults]) => {
        // Combine the results from both APIs
        const combinedArtworks = [
          ...metResults.map((artWork) => ({
            id: artWork.objectID,
            title: artWork.title,
            image: artWork.primaryImageSmall || "placeholder-image.jpg",
            artist: artWork.artistDisplayName || "Unknown Artist",
            api: "MET",
          })),
          ...rijksResults.map((artwork) => ({
            id: artwork.objectNumber,
            title: artwork.title,
            image: artwork.webImage?.url || "placeholder-image.jpg",
            artist: artwork.principalOrFirstMaker || "Unknown Artist",
            api: "Rijks",
          })),
        ];

        setArtWorks(combinedArtworks); // Set the combined results into state
      })
      .catch((err) => {
        console.error("Failed to fetch artworks:", err);
        setError("Failed to fetch artworks. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Stop the loading spinner when done
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
