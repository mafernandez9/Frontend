import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import axios from 'axios';
import VisitReview from '../components/VisitReview';
import '../styles/session.css';

export default function ReviewDetail() {
  const { bookId, reviewId } = useParams();
  const [review, setReview] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    setLoading(true);

    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}api/users`),
      axios.get(`${process.env.REACT_APP_API_URL}api/books/${bookId}/reviews/${reviewId}`),
    ])
      .then(([responseUsers, responseReview]) => {
        if (responseReview.status !== 200 || responseUsers.status !== 200) {
          setError(true);
          return {};
        }
        return Promise.all([responseUsers.data, responseReview.data]);
      })
      .then(([usersdata, dataReview]) => {
        // console.log('response: ', users);
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(usersdata, (_error, usersData) => setUsers(usersData));
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(dataReview, (_error, reviewData) => setReview(reviewData));
      })
      .catch(() => {
        // console.log(err);
        setError(true);
      })
      .finally(() => setLoading(false));
    return () => setDidMount(false);
  }, []);
  if (!didMount) {
    return null;
  }
  // console.log('users: ', users);
  // console.log('review: ', review);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <div>
          <VisitReview review={review} users={users} />
          {/* <UserProfile usuario={user} books={books} /> */}
        </div>
      )}
    </div>
  );
}