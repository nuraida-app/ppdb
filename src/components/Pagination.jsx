import React from "react";
import * as Fa from "react-icons/fa";

const Pagination = ({ page, totalPages, setPage }) => {
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <nav className="d-flex justify-content-between align-items-center">
      <ul className="pagination pagination-sm justify-content-center m-0">
        <li className={`page-item ${page === 1 && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <Fa.FaAngleDoubleLeft />
          </button>
        </li>
        {[...Array(totalPages).keys()].map((_, index) => (
          <li
            key={index + 1}
            className={`page-item ${page === index + 1 && "active"}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages && "disabled"}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            <Fa.FaAngleDoubleRight />
          </button>
        </li>
      </ul>

      <div>
        Halaman {page} dari {totalPages}
      </div>
    </nav>
  );
};

export default Pagination;
