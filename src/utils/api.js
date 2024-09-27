import axios from "axios";

const MET_API_BASE_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

const RIJKSMUSEUM_API_BASE_URL = "https://www.rijksmuseum.nl/api/nl/collection";

const RIJKSMUSEUM_API_KEY = "6vjE6xIR";

export const searchMetArtworks = async (
  searchTerm,
  page = 1,
  itemsToDisplay = 10
) => {
  return axios
    .get(`${MET_API_BASE_URL}/search?q=${searchTerm}`)
    .then((response) => {
      const objectIDs =
        response.data.objectIDs?.slice(
          (page - 1) * itemsToDisplay,
          page * itemsToDisplay
        ) || [];

      return Promise.all(
        objectIDs.map((id) =>
          axios
            .get(`${MET_API_BASE_URL}/objects/${id}`)
            .then((artworkResponse) => {
              const artWork = artworkResponse.data;
              return artWork;
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
  return axios
    .get(`${RIJKSMUSEUM_API_BASE_URL}`, {
      params: {
        key: RIJKSMUSEUM_API_KEY,
        q: searchTerm,
        p: page,
        ps: itemsPerPage,
      },
    })
    .then((response) => {
      return response.data.artObjects;
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
  const validArtworks = [];

  const fetchArtworks = async (page) => {
    const response = await axios.get(
      `${MET_API_BASE_URL}/search?q=${searchTerm}`
    );
    const objectIDs =
      response.data.objectIDs?.slice(
        (page - 1) * itemsToDisplay,
        page * itemsToDisplay
      ) || [];

    const artworks = await Promise.all(
      objectIDs.map((id) =>
        axios
          .get(`${MET_API_BASE_URL}/objects/${id}`)
          .then((artworkResponse) => {
            const artWork = artworkResponse.data;
            if (
              (searchTerm && artWork.classification === "") ||
              (searchTerm &&
                artWork.classification &&
                artWork.classification.toLowerCase() ===
                  searchTerm.toLowerCase())
            ) {
              return artWork;
            }
            return null;
          })
      )
    );

    const filteredArtworks = artworks.filter(Boolean);
    validArtworks.push(...filteredArtworks);

    if (validArtworks.length < itemsToDisplay && objectIDs.length > 0) {
      return fetchArtworks(page + 1);
    }
  };

  try {
    await fetchArtworks(page);
  } catch (error) {
    console.error("Error fetching artworks:", error);
  }
  // need to figure understand why the try catch block above lets the page continue functions, but the call below crashes it on certain searches. Was just a guess, ha
  //await fetchArtworks(page); // Start fetching artworks

  return validArtworks.slice(0, itemsToDisplay);
};
