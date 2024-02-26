import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        if (data.items) {
          setSearchResults(data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown',
            categories: item.volumeInfo.categories ? item.volumeInfo.categories.join(', ') : 'Unknown',
            image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '', // Book image
            donateLink: '#', // Dummy link for demonstration
            requestLink: '#' // Dummy link for demonstration
          })));
        } else {
          setSearchResults([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setSearchResults([]);
      });
  };

  const handleDonate = () => {

  };

  const handleRequest = () => {

  };

  return (
    <div className="App">
      <h1>Book Buddy</h1>
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter book title, author, or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control input-lg" // Added input-lg class for larger input
        />
        <button className="btn btn-primary btn-lg" onClick={handleSearch}>Search</button> {/* Added btn-lg class for larger button */}
      </div>
      <hr />
      <div className="search-results-container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="search-results-table">
              <table className="table table-bordered table-lg">

                <tbody>
                  <tr className="header-row">
                    <th><strong>Book Id</strong></th>
                    <th><strong>Image</strong></th>
                    <th><strong>Book Name</strong></th>
                    <th><strong>Author</strong></th>
                    <th><strong>Categories</strong></th>
                    <th><strong>Donate</strong></th>
                    <th><strong>Request</strong></th>
                  </tr>
                  {searchResults.map((result, index) => (
                    <tr key={result.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                      <td className="align-middle">{index + 1}</td>
                      <td className="align-middle">
                        <div className="book-image-container">
                          <img src={result.image} alt="Book Thumbnail" />
                        </div>
                      </td>
                      <td className="align-middle">{result.title}</td>
                      <td className="align-middle">{result.author}</td>
                      <td className="align-middle">{result.categories}</td>

                      <td className="align-middle">
                        <button className="btn btn-primary btn-sm" onClick={() => handleDonate(result.donateLink)}>Donate</button>
                      </td>
                      <td className="align-middle">
                        <button className="btn btn-secondary btn-sm" onClick={() => handleRequest(result.requestLink)}>Request</button>
                      </td>
                    </tr>
                  ))}
                  {searchResults.length > 0 && (
                    <tr className="separator-row">
                      <td colSpan="7"></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
