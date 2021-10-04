import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/bookProfile.css';
import SingleReview from './SingleReview';

function BookProfile(props) {
  const { users, reviews, book } = props;
  // const reviewsArray = reviews.filter((review) => review.bookId === book.id);
  const path = `/books/${book.id}/edit`;
  const path2 = `/books/${book.id}/delete`;
  const path3 = `/books/${book.id}/newreview`;

  return (
    <div className="profile">
      <div className="info-book">
        <h1>{book.title}</h1>
        <img alt="book" src={book.img} />
        <h3>{book.ISBN}</h3>
      </div>
      <h1 className="title-syn">Sinopsis</h1>
      {/* <hr /> */}
      <div className="synopsis">
        <p>{book.description}</p>
      </div>
      <button className="boton-libro" id="boton-profile-libro" type="submit">
        <Link className="link" to={path3}>Nueva review</Link>
      </button>
      <button className="boton-libro" id="boton-profile-libro" type="submit">
        <Link className="link" to={path}>Editar este libro</Link>
      </button>
      <button className="boton-libro" id="boton-profile-libro" type="submit">
        <Link className="link" to={path2}>Eliminar este libro</Link>
      </button>
      <h1 className="title-syn">Reviews</h1>
      <hr />
      <div>
        {reviews.map((review) => (
          <SingleReview key={review.id} review={review} book={book} users={users} />
        ))}
      </div>

    </div>

  );
}

export default BookProfile;
