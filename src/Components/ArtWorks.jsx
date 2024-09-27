import { useState } from "react";
import ArtPieceCard from "./ArtPieceCard";
import {
  searchMetArtworks,
  searchRijksmuseumArtworks,
  searchMetArtworksByType,
  searchRijksmuseumArtworksByType,
} from "../Utils/api";
import "../App.css";

const ArtWorks = ({ addToCollection }) => {
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("user");
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
    let metSearch = searchMetArtworks(search, currentPage, NumItemsDisplayed);
    let rijksSearch = searchRijksmuseumArtworks(
      search,
      currentPage,
      NumItemsDisplayed
    );

    if (searchType === "user") {
      metSearch = searchMetArtworks(search, currentPage, NumItemsDisplayed);
      rijksSearch = searchRijksmuseumArtworks(
        search,
        currentPage,
        NumItemsDisplayed
      );
    } else {
      metSearch = searchMetArtworksByType(
        search,
        currentPage,
        NumItemsDisplayed
      );
      rijksSearch = searchRijksmuseumArtworksByType(
        search,
        currentPage,
        NumItemsDisplayed
      );
    }

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
            style: artWork.classification,
          })),
          ...rijksResults.map((artwork) => ({
            id: artwork.objectNumber,
            title: artwork.title,
            image: artwork.webImage?.url,
            artist: artwork.principalOrFirstMaker || "Unknown Artist",
            api: "Rijks",
            style: "Rijks",
          })),
        ];
        if (combinedArtWorks.length === 0) setMoreItems(false);
        setArtWorks((prevArtWorks) => [...prevArtWorks, ...combinedArtWorks]);
        setPage((previousPage) => previousPage + 1);
      })
      .catch((err) => {
        console.error("There was an error searching for your artworks:", err);
        setError("Error searching for artworks. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="user"
            checked={searchType === "user"}
            onChange={() => {
              setSearchType("user");
              setSearch("");
            }}
          />
          User Search
        </label>
        <label>
          <input
            type="radio"
            value="dropdown"
            checked={searchType === "dropdown"}
            onChange={() => {
              setSearchType("dropdown");
              setSearch("");
            }}
          />
          Art Type Search
        </label>
      </div>
      {searchType === "user" && (
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for art..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

      {searchType === "dropdown" && (
        <div>
          <select onChange={(e) => setSearch(e.target.value)} value={search}>
            <option value="">Select Art Type</option>
            <option value="paintings">Painting</option>
            <option value="sculptures">Sculpture</option>
            <option value="prints">Print</option>
            <option value="ceramics">Ceramics</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
      )}

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
