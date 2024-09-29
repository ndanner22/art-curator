import { useState } from "react";
import ArtPieceCard from "./ArtPieceCard";
import {
  searchMetArtworks,
  searchRijksmuseumArtworks,
  searchMetArtworksByType,
  searchRijksmuseumArtworksByType,
} from "../Utils/api";
import "../App.css";

const rijksmuseumSearchType = {
  paintings: "schilderij",
  sculpture: "beeldhouwwerk",
  basketry: "mand",
  coins: "munt",
  jewelry: "sieraad",
  statue: "beeldhouwwerk",
  books: "boek",
};

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
      const translatedArtType = rijksmuseumSearchType[search] || search;

      metSearch = searchMetArtworksByType(
        search,
        currentPage,
        NumItemsDisplayed
      );
      rijksSearch = searchRijksmuseumArtworksByType(
        translatedArtType,
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
            api: "The MET New York City",
            date: artWork.objectDate,
            info: artWork.objectURL,
            type: artWork.classification,
          })),
          ...rijksResults.map((artWork) => ({
            id: artWork.objectNumber,
            title: artWork.title,
            image: artWork.webImage?.url,
            artist: artWork.principalOrFirstMaker || "Unknown Artist",
            api: "The Rijksmuseum in Amsterdam",
            //date: artWork.dating.presentingDate, - unable to locate the date of Rijks dates. It will take a second API call - will set up if time
            info: artWork.links.web,
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
      <div className="radio-group">
        <label className="radio-label">
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
        <label className="radio-label">
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
            <option value="sculpture">Sculpture</option>
            <option value="coins">Coins</option>
            <option value="basketry">Basketry</option>
            <option value="jewelry">Jewelry</option>
            <option value="statue">Statue</option>
            <option value="books">Book</option>
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
