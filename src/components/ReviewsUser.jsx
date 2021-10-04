import React from 'react';
import SingleReviewUser from './SingleReviewUser';
// import SearchBar from './SearchBar';
import '../styles/books.css';
// import portada from '../portada.jpg';
// import bookArray from '../data/books.js/index.js;

function ReviewsUser(props) {
  const { user, reviews } = props;
  return (
    <div>
      <SingleReviewUser user={user} reviews={reviews} />
    </div>
  );
}

export default ReviewsUser;