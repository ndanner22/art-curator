const ArtPieceCard = ({ artWork, addToCollection }) => {
  return (
    <div className="artwork">
      {/* Display the image if available, else show fallback message */}
      {artWork.image ? (
        <img src={artWork.image} alt={artWork.title} width="200px" />
      ) : (
        <div className="no-image">No Image Available 😔</div>
      )}
      <h3>{artWork.title}</h3>
      <p>Artist: {artWork.artist}</p>
      {/* Button to add the piece of art to user's collection, calling 'addToCollection' function */}
      <button onClick={() => addToCollection(artWork)}>
        Add to Collection
      </button>
    </div>
  );
};

export default ArtPieceCard;
