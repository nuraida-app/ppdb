import React, { useState } from "react";
import * as Md from "react-icons/md";

const TableContainer = ({
  children,
  page,
  totalPages,
  setLimit,
  setPage,
  onValue,
}) => {
  const [value, setValue] = useState("");
  const [limitValue, setLimitValue] = useState(10);

  const handleChange = (e) => {
    const newValue = e.target.value;

    setValue(newValue);
    if (onValue) {
      onValue(newValue);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newLimit = Number(event.target.value);
    setLimit(newLimit);
    setLimitValue(newLimit);
    setPage(1);
  };

  return (
    <div className="container-fluid">
      <div
        className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex justify-content-between"
        role="search"
      >
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Cari ..."
            value={value}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex align-items-center">
          <select
            className="form-select form-select-sm"
            value={limitValue}
            onChange={handleRowsPerPageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      <div className="table-responsive my-2">{children}</div>

      <nav className="d-flex justify-content-between align-items-center">
        <ul className="pagination pagination-sm justify-content-center m-0">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <Md.MdKeyboardDoubleArrowLeft />
            </button>
          </li>
          {[...Array(totalPages).keys()].map((_, index) => (
            <li
              key={index + 1}
              className={`page-item ${page === index + 1 ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              <Md.MdKeyboardDoubleArrowRight />
            </button>
          </li>
        </ul>

        <div>
          Halaman {page} of {totalPages}
        </div>
      </nav>
    </div>
  );
};

export default TableContainer;
