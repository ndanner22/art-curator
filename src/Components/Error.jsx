const Error = ({ message }) => {
  return (
    <div className="error">
      <p>Something went wrong! 😔</p>
      {message && <p>Error: {message}</p>}
    </div>
  );
};

export default Error;
