const Pagination = (props) => {
  return (
    <div>
      <button
        onClick={() => props.setCurrentPage(Math.max(1, props.currentPage - 1))}
      >
        previous
      </button>
      <button
        onClick={() =>
          props.setCurrentPage(
            Math.min(props.totalPages, props.currentPage + 1),
          )
        }
      >
        next
      </button>
      <p>
        strona {props.currentPage} z {props.totalPages}
      </p>
    </div>
  );
};

export default Pagination;
