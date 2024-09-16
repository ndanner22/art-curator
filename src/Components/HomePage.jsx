import { getArtById } from "../Utils/api";
import { useState, useEffect } from "react";

export default function ArtList() {
  const [artData, setArtData] = useState(null);
  useEffect(() => {
    getArtById(23634).then(({ data }) => {
      setArtData(data.primaryImage);
      console.log(data);
      console.log(artData.objectURL);
      console.log(data.objectURL);
    });
  }, []);

  return (
    <>
      <img src={artData} />
    </>
  );
}
