import { useState, useContext } from "react";
import ArtPieceCard from "./ArtPieceCard";
import Loading from "./Loading";
import Error from "./Error";
import {
  searchMetArtworks,
  searchRijksmuseumArtworks,
  searchMetArtworksByType,
  searchRijksmuseumArtworksByType,
} from "../utils/api.js"; // Import API functions for fetching art
import "../App.css";
import { SearchContext } from "./SearchContext"; // Import SearchContext to access global search states

// Translate art types to Dutch for Rijksmuseum's type for search
const rijksmuseumSearchType = {
  paintings: "schilderij",
  sculpture: "beeldhouwwerk",
  basketry: "mand",
  coins: "munt",
  jewelry: "sieraad",
  statue: "beeldhouwwerk",
  books: "boek",
};

const ArtWorksSearch = ({ addToCollection }) => {
  // Destructure global state values from SearchContext using useContext
  const {
    search,
    setSearch,
    searchType,
    setSearchType,
    artWorks,
    setArtWorks,
  } = useContext(SearchContext);

  //State to manage the loading during art search
  const [loading, setLoading] = useState(false);
  // State to store any errors in search
  const [error, setError] = useState(null);
  // State to track the current page of search results
  const [page, setPage] = useState(1);
  // State to determine there are more items to load
  const [moreItems, setMoreItems] = useState(true);

  // Limit of number of items to fetch during each independent API call
  const NumItemsDisplayed = 10;

  // Function to handle searching for art - new or load more
  const handleSearch = (isNewSearch = true) => {
    if (isNewSearch) {
      // Reset art and page number for new search
      setArtWorks([]);
      setPage(1);
    }
    setLoading(true);
    setError(null);

    // Prevent user from performing search when dropdown menu is on 'Select Art Type'
    if (searchType === "dropdown" && search === "") {
      setLoading(false);
      return; // Do not perform a search
    }
    // Set the current page depending on if a new search or loading more
    const currentPage = isNewSearch ? 1 : page;

    // Start search functions for MET and Rijksmuseum APIs
    let metSearch = searchMetArtworks(search, currentPage, NumItemsDisplayed);
    let rijksSearch = searchRijksmuseumArtworks(
      search,
      currentPage,
      NumItemsDisplayed
    );

    // If a user search, search API's using user's input
    if (searchType === "user") {
      metSearch = searchMetArtworks(search, currentPage, NumItemsDisplayed);
      rijksSearch = searchRijksmuseumArtworks(
        search,
        currentPage,
        NumItemsDisplayed
      );
    } else {
      // Else, translate type to Ductch for Rijksmuseum search and search APIs by type
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

    // Handle the result from both MET and Rijksmuseum
    Promise.all([metSearch, rijksSearch])
      .then(([metResults, rijksResults]) => {
        // Combine the results from both APIs
        // Format results from both APIs
        const combinedArtWorks = [
          ...metResults.map((artWork) => ({
            id: artWork.objectID,
            title: artWork.title,
            image: artWork.primaryImageSmall,
            artist: artWork.artistDisplayName || "Unknown Artist",
            api: "The MET",
            date: artWork.objectDate || "Date not Found",
            info: artWork.objectURL,
            type: artWork.classification,
            location: "The MET Museum in New York City",
          })),
          ...rijksResults.map((artWork) => ({
            id: artWork.objectNumber,
            title: artWork.title,
            image: artWork.webImage?.url,
            artist: artWork.principalOrFirstMaker || "Unknown Artist",
            api: "The Rijksmuseum",
            date: "Date not Found", //unable to locate the date of Rijks dates. It will take a second API call - will set up if time
            info: artWork.links.web,
            location: "The Rijksmuseum in Amsterdam",
          })),
        ];
        // Check if to see if no results were returned
        if (combinedArtWorks.length === 0) setMoreItems(false);
        // Append new artworks to the previous list
        setArtWorks((prevArtWorks) => [...prevArtWorks, ...combinedArtWorks]);
        // Increment the page number for future "Show More" requests
        setPage((previousPage) => previousPage + 1);
      })
      .catch((err) => {
        console.error("There was an error searching for your artworks:", err);
        setError("Error searching for artworks. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Turn off loading once data has been fetched
      });
  };

  // Function to reset/clear the current search
  const clearSearch = () => {
    setSearch(""); // Clear the search term
    setSearchType("user"); // Reset search type to default
    setArtWorks([]); // Clear any currently displayed artworks
    setPage(1); // Reset the page number to default
    setMoreItems(true); // Reset the 'moreItems' to default
  };

  return (
    <div>
      <div className="intro-text">
        <h1>Welcome to the Art Gallery</h1>
        <p>
          Discover and explore a wide range of artworks from renowned museums
          around the world. Use the search feature to find your favorite pieces
          or browse by type of art.
        </p>
        <p>
          Once you find an artwork you love, you can easily add it to your
          personal collection for future reference. Navigate through your
          collection and enjoy your curated selection of art!
        </p>
      </div>
      <div className="search-container">
        {/* Radio buttons to toggle between User Search and Search by Art Type */}
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              value="user"
              checked={searchType === "user"}
              onChange={() => {
                setSearchType("user"); // Set search type to "user" when selected
                setSearch(""); // Clear search input when changed
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
                setSearchType("dropdown"); // Set search type to "dropdown" when selected
                setSearch(""); // Clear search input when changed
              }}
            />
            Search by Type of Art
          </label>
        </div>
        {/* Render input field for manual search if user search is selected */}
        {searchType === "user" && (
          <div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)} // Update search term
              placeholder="Manual search..."
              // Trigger handleSearch when the user press the enter key down while their focus area is inside the manual search input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        )}
        {/* Render dropdown for search by art type if art type search is selected */}
        {searchType === "dropdown" && (
          <div>
            <select
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              // Trigger handleSearch when the user press the enter key down while their focus area is inside the dropdown search input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            >
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
        <button onClick={clearSearch}>Clear Search</button> {/* Clear button */}
      </div>
      {/* Use the Loading component to show loading if currently loading */}
      {loading && <Loading />}
      {/* Display any error that occurred during search using Error Component*/}
      {error && <Error message={error} />}
      {/* Display the list of found art */}
      <div className="art-grid">
        {artWorks.map((artWork) => (
          <ArtPieceCard
            key={artWork.objectID}
            artWork={artWork} // Pass art data to the card component
            addToCollection={addToCollection} // Pass function to add art to user's collection
          />
        ))}
      </div>
      {/* Show 'Load More' button if there are more items to display */}
      {moreItems && artWorks.length > 0 && (
        <button onClick={() => handleSearch(false)} disabled={loading}>
          {loading ? <Loading /> : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ArtWorksSearch;
