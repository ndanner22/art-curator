const CollectionArtPieceCard = ({ artWork }) => {
  return (
    <div className="collection">
      {/* Conditionally render the image section of the art */}
      {artWork.image ? (
        <div className="image-container">
          {/* If image is available, wrap in an anchor tag to allow opening it in a new tab */}
          <a href={artWork.image} target="_blank" rel="noopener noreferrer">
            <img src={artWork.image} alt={artWork.title} width="200px" />
          </a>
        </div>
      ) : (
        {
          /* Provide a link to more detailed information about the artwork */
        }(<div className="no-image">No Image Available 😔</div>)
      )}
      <div className="collection-info">
        <h3>{artWork.title}</h3>
        <p>Artist: {artWork.artist}</p>
        <p>Museum: {artWork.api}</p>
        <p>Date: {artWork.date}</p>
        <p>Location of piece: {artWork.api}</p>
        {/* Provide a link to more detailed information about the artwork */}
        <a href={artWork.info} target="_blank" rel="noopener noreferrer">
          More Information
        </a>
      </div>
    </div>
  );
};

export default CollectionArtPieceCard;
