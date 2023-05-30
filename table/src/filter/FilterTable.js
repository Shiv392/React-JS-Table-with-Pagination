import React, { useEffect, useState } from 'react';

const DynamicTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterValue, setFilterValue] = useState('');
  const [sortField, setSortField] = useState('id'); // Initial sort field
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  const applyFilter = () => {
    return data.filter(item => item.title.toLowerCase().includes(filterValue.toLowerCase()));
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
    setCurrentPage(1); // Reset current page when filter value changes
  };

  const handleSort = (field) => {
    if (field === sortField) {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(newSortOrder);
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };
 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const filteredData = applyFilter();
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = filteredData.slice(startIndex, endIndex);

 // Sorting
 const sortCompare = (a, b) => {
    if (sortField === 'id' || sortField === 'userId') {
      return sortOrder === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    } else {
      return sortOrder === 'asc' ? a[sortField].localeCompare(b[sortField]) : b[sortField].localeCompare(a[sortField]);
    }
  };
  itemsToShow.sort(sortCompare);

  return (
    <div className='container mt-2'>
      <input className='form-control' type="text" value={filterValue} onChange={handleFilterChange} placeholder="Filter by title" />

      <table className='table table-bordered'>
        <thead>
          <tr>
            <th><button className='btn btn-sm btn-light' onClick={() => handleSort('id')}>
                ID {sortField === 'id' && sortOrder === 'asc' ? <>&#9650;</> : <>&#9660;</>}
              </button></th>
            <th> <button className='btn btn-sm btn-light' onClick={() => handleSort('title')}>
                Title {sortField === 'title' && sortOrder === 'asc' ? <>&#9650;</> : <>&#9660;</>}
              </button></th>
            <th><button className='btn btn-sm btn-light' onClick={() => handleSort('userId')}>
                UserID {sortField === 'userId' && sortOrder === 'asc' ? <>&#9650;</> : <>&#9660;</>}
              </button></th>
          </tr>
        </thead>
        <tbody>
          {itemsToShow.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button className='btn btn-light m-1' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button className='btn btn-primary m-1'
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button className='btn btn-light m-1' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default DynamicTable;
