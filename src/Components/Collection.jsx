import React from "react";

const Collection = ({ collection }) => {
  return (
    <div>
      <h2>Your Personal Collection!</h2>
      <div>
        {collection.map((artWork) => (
          <div key={artWork.id}>
            <img src={artWork.image} alt={artWork.title} />
            <h3>{artWork.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
