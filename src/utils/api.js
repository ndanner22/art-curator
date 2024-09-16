import axios from "axios";

export const getArtById = (artId) => {
  const baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`;
  return axios
    .get(baseUrl)
    .then(({ data }) => {
      console.log(data);
      return { data };
    })
    .catch(({ response }) => {
      return `${response.data.status}: article can't load`;
    });
};
