import React, { useState } from "react";
import { Table } from "react-bootstrap";

function Home() {
  const [search, setSearch] = React.useState("");
  const [books, setBooks] = React.useState([]);

  const fetchBooks = (query) => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`)
      .then((res) => res.json())
      .then((data) => setBooks(data.items));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks(search);
  };

  return (
    <div>
      <h1>BookBuddy</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for books"
        />
        <button type="submit">Search</button>
      </form>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Categories</th>
            <th>Donate</th>
            <th>Request</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.volumeInfo.title}</td>
              <td>
                {book.volumeInfo.authors &&
                  book.volumeInfo.authors.join(", ")}
              </td>
              <td>
                {book.volumeInfo.categories &&
                  book.volumeInfo.categories.join(", ")}
              </td>
              <td>
                <a href="/donate">Donate</a>
              </td>
              <td>
                <a href="/request">Request</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Home;
