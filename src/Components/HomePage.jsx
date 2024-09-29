import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import Artworks from "./ArtWorksSearchPage";
import Collection from "./CollectionPage";

const HomePage = () => {
  const [collection, setCollection] = useState([]);

  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  };

  // function to check if the artwork is already in the collection
  const addToCollection = (artWork) => {
    const isAlreadyInCollection = collection.some(
      (item) => item.id === artWork.id
    );

    if (isAlreadyInCollection) {
      alert("This artwork is already in your collection.");
    } else {
      setCollection((prevCollection) => [...prevCollection, artWork]);
      alert("Artwork added to your collection!");
    }
  };
  return (
    <Router>
      <ScrollToTop />
      <div>
        <nav className="navbar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/collection" className="nav-link">
            My Collection
          </Link>
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
