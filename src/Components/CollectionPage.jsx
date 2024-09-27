import CollectionArtPieceCard from "./CollectionArtPieceCard";

const Collection = ({ artworks }) => {
  return (
    <div>
      <h2>Your Personal Collection!</h2>
      <div className="art-grid">
        {artworks.map((artWork) => (
          <CollectionArtPieceCard key={artWork.id} artWork={artWork} />
        ))}
      </div>
    </div>
  );
};

export default Collection;
