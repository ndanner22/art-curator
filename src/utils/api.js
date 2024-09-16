import axios from "axios";

export const getArtById = (artId) => {
  const baseUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`;
  return axios
    .get(baseUrl)
    .then(({ data }) => {
      return { data };
    })
    .catch(({ response }) => {
      return `${response.data.status}: article can't load`;
    });
};
