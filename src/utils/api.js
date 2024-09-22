import axios from "axios";

const MET_API_BASE_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

const RIJKSMUSEUM_API_BASE_URL = "https://www.rijksmuseum.nl/api/nl/collection";

const RIJKSMUSEUM_API_KEY = "6vjE6xIR";

export const searchMetArtworks = async (searchTerm) => {
  const response = await axios.get(
    `${MET_API_BASE_URL}/search?q=${searchTerm}`
  );
  const objectIDs = response.data.objectIDs?.slice(0, 10) || [];

  const artworks = await Promise.all(
    objectIDs.map(async (id) => {
      const artworkResponse = await axios.get(
        `${MET_API_BASE_URL}/objects/${id}`
      );
      return artworkResponse.data;
    })
  );

  return artworks;
};

export const searchRijksmuseumArtworks = async (searchTerm) => {
  const response = await axios.get(RIJKSMUSEUM_API_BASE_URL, {
    params: {
      key: RIJKSMUSEUM_API_KEY,
      q: searchTerm,
      ps: 10,
    },
  });
  return response.data.artObjects;
};
