import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import axios from 'axios';
import BookProfile from '../components/BookProfile';
import useAuth from '../hooks/useAuth';
import '../styles/bookProfile.css';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    setLoading(true);
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}api/users`),
      axios.get(`${process.env.REACT_APP_API_URL}api/books/${id}`),
      axios.get(`${process.env.REACT_APP_API_URL}api/books/${id}/reviews`),
    ])
      .then(([responseUsers, responseBook, responseReviews]) => {
        if (responseUsers.status !== 200 || responseBook.status !== 200
        || responseReviews.status !== 200) {
          setError(true);
          return {};
        }

        return Promise.all([responseUsers.data, responseBook.data, responseReviews.data]);
      })
      .then(([usersdata, bookdata, reviewsdata]) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(usersdata, (_error, usersData) => setUsers(usersData));
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(bookdata, (_error, bookData) => setBook(bookData));
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(reviewsdata, (_error, reviewsData) => setReviews(reviewsData));
      })
      .catch(() => {
        setError(true);
        // console.log(err);
      })
      .finally(() => setLoading(false));
    // return (() => {
    //   if (!unmounted) {
    //     unmounted = true;
    //   }
    // })
    return () => setDidMount(false);
  }, []);
  if (!didMount) {
    return null;
  }

  // console.log('users:', users);
  // console.log(error)
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      {!currentUser && <Redirect to="/login" />}
      {error ? (

        <h2>Something went wrong, please try again later</h2>

      ) : (
        <div>
          {/* <UserProfile usuario={user} books={books} /> */}
          {/* <h2>{user.firstName}</h2>
          <h2>{user.lastName}</h2> */}
          <BookProfile book={book} reviews={reviews} users={users} />
        </div>
      )}
    </div>
  );
}