import { createContext, useState } from "react";

// Create a context for managing search state globally across components - this will allow a user to leave and return to search page with the current search still present
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState(""); // State to hold user's search input
  const [searchType, setSearchType] = useState("user"); // State to manage the type of search
  const [artWorks, setArtWorks] = useState([]); // State to store fetched artworks

  return (
    // Provide searh term, searchType and list of of artworks to context
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        searchType,
        setSearchType,
        artWorks,
        setArtWorks,
      }}
    >
      {children} {/* Render child components within the context provider */}
    </SearchContext.Provider>
  );
};
