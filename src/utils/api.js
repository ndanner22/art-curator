import axios from "axios";

// Set the base URL for The Met
const MET_API_BASE_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

// Set the base URL for the Rijksmuseum
const RIJKSMUSEUM_API_BASE_URL = "https://www.rijksmuseum.nl/api/nl/collection";

// Set the API key for the Rijksmuseum
const RIJKSMUSEUM_API_KEY = "6vjE6xIR";

export const searchMetArtworks = async (
  searchTerm, // Term to search for
  page = 1, // The page number (pagination)
  itemsToDisplay = 10 // Number of items to show on each page
) => {
  // Make the search request to the MET API.
  return axios
    .get(`${MET_API_BASE_URL}/search?q=${searchTerm}`)
    .then((response) => {
      // Pull object IDs from the response and slice them for pagination.
      const objectIDs =
        response.data.objectIDs?.slice(
          (page - 1) * itemsToDisplay,
          page * itemsToDisplay
        ) || [];
      // Make individual requests for each artwork object.
      return Promise.all(
        // return list of art
        objectIDs.map((id) =>
          axios
            .get(`${MET_API_BASE_URL}/objects/${id}`)
            .then((artworkResponse) => {
              const artWork = artworkResponse.data;
              return artWork; // Return individual art data.
            })
        )
      );
    })
    .catch((error) => {
      console.error("Error searching for MET artworks:", error);
      return [];
    });
};

export const searchRijksmuseumArtworks = (
  searchTerm,
  page = 1,
  itemsPerPage = 10
) => {
  // Make the search request to the Rijksmuseum API.
  return axios
    .get(`${RIJKSMUSEUM_API_BASE_URL}`, {
      params: {
        key: RIJKSMUSEUM_API_KEY, // API key for Rijksmuseum.
        q: searchTerm,
        p: page,
        ps: itemsPerPage,
      },
    })
    .then((response) => {
      return response.data.artObjects; // Return the list of art
    })
    .catch((error) => {
      console.error("Error searching for Rijksmuseum artworks:", error);
      return [];
    });
};

export const searchMetArtworksByType = async (
  searchTerm,
  page = 1,
  itemsToDisplay = 10
) => {
  const validArtworks = []; // Store valid artworks that match the search type.

  // Function to fetch artworks page by page.
  const fetchArtworks = async (page) => {
    const response = await axios.get(
      `${MET_API_BASE_URL}/search?q=${searchTerm}`
    );
    const objectIDs =
      response.data.objectIDs?.slice(
        (page - 1) * itemsToDisplay,
        page * itemsToDisplay
      ) || [];
    // Make individual requests for each object ID.
    const artworks = await Promise.all(
      objectIDs.map((id) =>
        axios
          .get(`${MET_API_BASE_URL}/objects/${id}`)
          .then((artworkResponse) => {
            const artWork = artworkResponse.data;
            // Filter artworks based on their classification matching the search term.
            if (
              (searchTerm && artWork.classification === "") ||
              (searchTerm &&
                artWork.classification &&
                artWork.classification.toLowerCase() ===
                  searchTerm.toLowerCase())
            ) {
              return artWork; // Return the art if it matches.
            }
            return null; // Return null if the classification doesn't match.
          })
      )
    );

    const filteredArtworks = artworks.filter(Boolean); // Remove null values.
    validArtworks.push(...filteredArtworks); // Add valid art to the list.

    // If not enough artworks are found, recursively fetch more pages.
    if (validArtworks.length < itemsToDisplay && objectIDs.length > 0) {
      // Recursive call to fetch more artworks.
      return fetchArtworks(page + 1);
    }
  };

  try {
    await fetchArtworks(page); // Start fetching artworks.
  } catch (error) {
    console.error("Error fetching artworks:", error);
  }
  // need to figure understand why the try catch block above lets the page continue functions, but the call below crashes it on certain searches. Was just a guess, ha
  //await fetchArtworks(page); // Start fetching artworks

  return validArtworks.slice(0, itemsToDisplay); // Return the list of artworks.
};

export const searchRijksmuseumArtworksByType = (
  type,
  page = 1,
  itemsPerPage = 10
) => {
  // Make request to Rijksmuseum API with the provided type and page.
  return axios
    .get(`${RIJKSMUSEUM_API_BASE_URL}`, {
      params: {
        key: RIJKSMUSEUM_API_KEY,
        type: type,
        p: page,
        ps: itemsPerPage,
      },
    })
    .then((response) => {
      return response.data.artObjects; // Return the list of artworks.
    })
    .catch((error) => {
      console.error("Error searching for Rijksmuseum artworks:", error);
      return [];
    });
};
