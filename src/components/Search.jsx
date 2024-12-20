import React, { useState } from "react";

const Search = ({ data, searchKeys, onSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(searchTerm);

    if (!searchTerm) {
      // Jika query kosong, kosongkan hasil pencarian
      onSearchResults([]);
      return;
    }

    // Filter data berdasarkan query dan keys
    const filteredData = data?.filter((item) =>
      searchKeys.some((key) =>
        String(item[key]).toLowerCase().includes(searchTerm)
      )
    );

    // Callback untuk mengembalikan hasil pencarian
    onSearchResults(filteredData);
  };

  return (
    <div className="search-component">
      <input
        type="text"
        className="form-control"
        placeholder="Cari ..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
