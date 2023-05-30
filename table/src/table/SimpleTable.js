import React, { useEffect, useState } from 'react'
import axios from 'axios'



function SimpleTable() {
    const [data,setData]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);

    const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const itemsToShow = data.slice(startIndex, endIndex);
const totalPages = Math.ceil(data.length / itemsPerPage);

const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

    useEffect(  ()=>{
    async function fetchData(){
       try{
        let response= await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data)
       }
       catch(err){
        console.log(err);
       }
    }
    fetchData();
    console.log(data);
    },[])
  return (
    <div className='container mt-5'>
      <table className="table table-bordered table-hover table-dark">
  <thead className=' thead thead-dark'>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Title</th>
      <th scope="col">UserId</th>
    </tr>
  </thead>
  <tbody >
    {
        itemsToShow.map(item=> (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.userId}</td>
            </tr>
        ))
    }
  </tbody>
</table>
<div>
  <button className='btn btn-light m-1' onClick={previousPage} disabled={currentPage === 1}>Previous</button>
  {Array.from({ length: totalPages }, (_, index) => (
    <button className='btn btn-primary m-1' key={index} onClick={() => goToPage(index + 1)} disabled={currentPage === index + 1}>
      {index + 1}
    </button>
  ))}
  <button className='btn btn-light m-1' onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
</div>
    </div>
  )
}

export default SimpleTable
