import { useState } from "react";
import ArtPieceCard from "./ArtPieceCard";
import { searchMetArtworks, searchRijksmuseumArtworks } from "../Utils/api";
import "../App.css";

const ArtWorks = ({ addToCollection }) => {
  const [search, setSearch] = useState("");
  const [artWorks, setArtWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [moreItems, setMoreItems] = useState(true);

  const NumItemsDisplayed = 10;

  const handleSearch = (isNewSearch = true) => {
    if (isNewSearch) {
      setArtWorks([]);
      setPage(1);
    }
    setLoading(true);
    setError(null);

    const currentPage = isNewSearch ? 1 : page;
    const metSearch = searchMetArtworks(search, currentPage, NumItemsDisplayed);
    const rijksSearch = searchRijksmuseumArtworks(
      search,
      currentPage,
      NumItemsDisplayed
    );

    Promise.all([metSearch, rijksSearch])
      .then(([metResults, rijksResults]) => {
        // Combine the results from both APIs
        const combinedArtWorks = [
          ...metResults.map((artWork) => ({
            id: artWork.objectID,
            title: artWork.title,
            image: artWork.primaryImageSmall,
            artist: artWork.artistDisplayName || "Unknown Artist",
            api: "MET",
          })),
          ...rijksResults.map((artwork) => ({
            id: artwork.objectNumber,
            title: artwork.title,
            image: artwork.webImage?.url,
            artist: artwork.principalOrFirstMaker || "Unknown Artist",
            api: "Rijks",
          })),
        ];
        if (combinedArtWorks.length === 0) setMoreItems(false);
        setArtWorks((prevArtWorks) => [...prevArtWorks, ...combinedArtWorks]);
        setPage((previousPage) => previousPage + 1);
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

      <div className="art-grid">
        {artWorks.map((artWork) => (
          <ArtPieceCard
            key={artWork.objectID}
            artWork={artWork}
            addToCollection={addToCollection}
          />
        ))}
      </div>
      {moreItems && artWorks.length > 0 && (
        <button onClick={() => handleSearch(false)} disabled={loading}>
          {loading ? "Loading..." : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ArtWorks;
