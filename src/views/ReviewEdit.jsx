import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import axios from 'axios';
import ReviewEdit from '../components/ReviewEdit';
import '../styles/session.css';

export default function ReviewEdit2() {
  const { bookId, reviewId } = useParams();
  const [review, setReview] = useState({});
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    setLoading(true);
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}api/books/${bookId}/reviews/${reviewId}`),
      axios.get(`${process.env.REACT_APP_API_URL}api/books/${bookId}`),
    ])
      .then(([responseReview, responseBook]) => {
        if (responseReview.status !== 200 || responseBook.status !== 200) {
          setError(true);
          return {};
        }
        return [responseReview.data, responseBook.data];
      })
      .then(([dataReview, dataBook]) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(dataBook, (_error, bookData) => setBook(bookData));
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(dataReview, (_error, reviewData) => setReview(reviewData));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
    return () => setDidMount(false);
  }, []);
  if (!didMount) {
    return null;
  }

  // useEffect(() => {
  //   setLoading(true);
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         setError(true);
  //         return {};
  //       }
  //       return response.data;
  //     })
  //     .then((data) => {
  //     })
  //     .catch(() => {
  //       setError(true);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <div>
          <ReviewEdit review={review} book={book} />
          {/* <UserProfile usuario={user} books={books} /> */}
        </div>
      )}
    </div>
  );
}