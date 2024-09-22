import axios from "axios";

const MET_API_BASE_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

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
