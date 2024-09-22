import { useState } from "react";
import ArtWorks from "./ArtWorks";
import Collection from "./Collection";

const HomePage = () => {
  const [collection, setCollection] = useState([]);

  const addToCollection = (artWork) => {
    setCollection((prevCollection) => [...prevCollection, artWork]);
  };
  return (
    <div>
      <h1>My Art Collection</h1>
      <ArtWorks addToCollection={addToCollection} />
      <Collection collection={collection} />
    </div>
  );
};

export default HomePage;
