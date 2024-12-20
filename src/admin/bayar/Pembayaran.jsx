import React, { useState } from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import Layout from "../../components/Layout";

const Pembayaran = () => {
  const usersData = [
    { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
    { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
    { id: 3, first: "Larry", last: "Bird", handle: "@twitter" },
    { id: 4, first: "John", last: "Doe", handle: "@jdoe" },
    { id: 5, first: "Jane", last: "Smith", handle: "@jsmith" },
    { id: 6, first: "Chris", last: "Evans", handle: "@cevans" },
    { id: 7, first: "Emily", last: "Clark", handle: "@eclark" },
    { id: 8, first: "Michael", last: "Scott", handle: "@mscott" },
    { id: 9, first: "Pam", last: "Beesly", handle: "@pbeesly" },
    { id: 10, first: "Dwight", last: "Schrute", handle: "@dschrute" },
    { id: 11, first: "Jim", last: "Halpert", handle: "@jhalpert" },
    { id: 12, first: "Kelly", last: "Kapoor", handle: "@kkapoor" },
    { id: 13, first: "Stanley", last: "Hudson", handle: "@shudson" },
    { id: 14, first: "Oscar", last: "Martinez", handle: "@omartinez" },
    { id: 15, first: "Angela", last: "Martin", handle: "@amartin" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate pagination details
  const totalPages = Math.ceil(usersData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = usersData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when rows per page change
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="container d-flex align-items-center justify-content-between mb-3">
          <p className="m-0 fw-bold">Pembayaran</p>
        </div>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input
            type="search"
            className="form-control form-control-light text-bg-light"
            placeholder="Search..."
            aria-label="Search"
          />
        </form>

        <table className="table table-striped table-hover mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{startIndex + index + 1}</th>
                <td>{user.first}</td>
                <td>{user.last}</td>
                <td>{user.handle}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <select
              className="form-select form-select-sm"
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            Data
          </div>

          <ul className="pagination justify-content-center m-0">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <Fa.FaAngleDoubleLeft />
              </button>
            </li>
            {[...Array(totalPages).keys()].map((page) => (
              <li
                key={page + 1}
                className={`page-item ${currentPage === page + 1 && "active"}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <Fa.FaAngleDoubleRight />
              </button>
            </li>
          </ul>

          <div>
            Hal {currentPage} dari {totalPages}
          </div>
        </nav>
      </div>
    </Layout>
  );
};

export default Pembayaran;
