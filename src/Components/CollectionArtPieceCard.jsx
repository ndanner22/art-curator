const CollectionArtPieceCard = ({ artWork }) => {
  return (
    <div className="collection">
      {artWork.image ? (
        <div className="image-container">
          <img src={artWork.image} alt={artWork.title} width="200px" />
        </div>
      ) : (
        <div className="no-image">No Image Available 😔</div>
      )}
      <div className="collection-info">
        <h3>{artWork.title}</h3>
        <p>Artist: {artWork.artist}</p>
        <p>Museum: {artWork.api}</p>
        <p>Date: {artWork.date}</p>
        <p>Location of piece: {artWork.api}</p>
        <a href={artWork.info} target="_blank" rel="noopener noreferrer">
          More Information
        </a>
      </div>
    </div>
  );
};

export default CollectionArtPieceCard;
