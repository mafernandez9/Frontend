import React from 'react';
import { Link } from 'react-router-dom';

function SingleBook(props) {
  const { book } = props;
  const path = `/books/${book.id}`;
  return (
    <li className="single-book">
      <img alt="book" src={book.image} />
      <h3>{book.title}</h3>
      <button className="boton-libro" type="submit">
        <Link className="link" to={path}>Ver libro</Link>
      </button>
    </li>
  );
}

export default SingleBook;
