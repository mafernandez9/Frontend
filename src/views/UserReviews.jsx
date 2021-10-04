import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import { useParams } from 'react-router-dom';
import ReviewsUser from '../components/ReviewsUser';

export default function UserReviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}api/users/${id}/reviews`),
      axios.get(`${process.env.REACT_APP_API_URL}api/users/${id}`),
    ])
      .then(([responseReviews, responseUser]) => {
        if (responseReviews.status !== 200 || responseUser.status !== 200) {
          setError(true);
          return {};
        }
        return [responseReviews.data, responseUser.data];
      })
      .then(([dataReviews, dataUser]) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(dataReviews, (_error, reviewsData) => setReviews(reviewsData));
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(dataUser, (_error, userData) => setUser(userData));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  //   console.log(user);
  //   console.log(reviews);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      {/* <Link to="/">Volver</Link> */}
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <ReviewsUser user={user} reviews={reviews} />
      )}
    </div>
  );
}
