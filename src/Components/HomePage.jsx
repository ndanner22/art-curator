import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Artworks from "./Artworks";
import Collection from "./Collection";

const HomePage = () => {
  const [collection, setCollection] = useState([]); // State to hold the artworks in the collection

  const addToCollection = (artwork) => {
    setCollection((prevCollection) => [...prevCollection, artwork]);
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/collection">My Collection</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<Artworks addToCollection={addToCollection} />}
          />
          <Route
            path="/collection"
            element={<Collection artworks={collection} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default HomePage;
