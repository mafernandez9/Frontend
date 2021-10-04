import React from 'react';
import SingleBook from './SingleBook';
import SearchBar from './SearchBar';
import '../styles/books.css';
// import portada from '../portada.jpg';
// import bookArray from '../data/books.js/index.js;

function Books(props) {
  const { books } = props;
  return (
    <div className="books">
      <div>
        <h3 className="title">Lista de libros</h3>
      </div>
      <SearchBar />
      <ul className="book-list">
        {books.map((book) => (
          <SingleBook key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
}

export default Books;
