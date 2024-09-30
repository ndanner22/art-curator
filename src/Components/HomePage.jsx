import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom"; // Import needed components from react-router-dom for routing between pages
import ArtWorksSearch from "./ArtWorksSearch";
import Collection from "./CollectionPage";

const HomePage = () => {
  // State that will store user's personally curated collection
  const [collection, setCollection] = useState([]);

  // Custom hook to ensure the pages scrolls back to top when the user navigates to them
  const ScrollToTop = () => {
    const { pathname } = useLocation(); // Extract the current pathname from react-router-dom
    useEffect(() => {
      // Effect so that when the pathname changes it scrolls to the top of the page
      window.scrollTo(0, 0);
    }, [pathname]); // Array to ensure this runs when the path changes
  };

  // Function to add artwork to the user's collection and also prevent duplicate additions
  const addToCollection = (artWork) => {
    const isAlreadyInCollection = collection.some(
      (item) => item.id === artWork.id // Check if the piece of art is already present in the collection
    );

    if (isAlreadyInCollection) {
      alert("This artwork is already in your collection."); // Notify user if piece of art already in collection
    } else {
      // If not already in collection, add to collection and notify user of addition
      setCollection((prevCollection) => [...prevCollection, artWork]);
      alert("Artwork added to your collection!");
    }
  };
  return (
    <Router>
      <ScrollToTop />
      <div>
        {/* Create Navbar */}
        <nav className="navbar">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/collection" className="nav-link">
            My Collection
          </Link>
        </nav>
        {/* Define routes for navigating between the homepage and the collection page */}
        <Routes>
          {/* ArtWorksSearch route with addToCollection function as a prop */}
          <Route
            path="/"
            element={<ArtWorksSearch addToCollection={addToCollection} />}
          />
          {/* Collection page route with user's collection passed as a prop */}
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
