const ArtPieceCard = ({ artWork, addToCollection }) => {
  return (
    <div className="artwork">
      {artWork.image ? (
        <img src={artWork.image} alt={artWork.title} width="200px" />
      ) : (
        <div className="no-image">No Image Available 😔</div>
      )}
      <h3>{artWork.title}</h3>
      <p>Artist: {artWork.artist}</p>
      <p>Museum: {artWork.api}</p>
      <p>{artWork.type}</p>
      <button onClick={() => addToCollection(artWork)}>
        Add to Collection
      </button>
    </div>
  );
};

export default ArtPieceCard;
