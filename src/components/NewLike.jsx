/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function NewLike() {
  const { bookId, reviewId } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();
  const pathbook = `/books/${bookId}`;

  if (!currentUser) return <Redirect to="/login" />;
  useEffect(() => {
    setLoading(true);
    async function createLike() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.access_token}`,
        },
        body: JSON.stringify({ userId: currentUser.id, reviewId }),
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/books/${bookId}/reviews/${reviewId}/likes`, requestOptions);
        if (!response.ok) {
          const errors = await response.text();
          setError(errors);
        //   return error;
          // throw new Error(error);
        }
        setMessage('Like has been successfully created!');
      } catch (err) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    }
    createLike();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <div>
          <Redirect to={pathbook} />
          <p>{message}</p>
        </div>
      )}
    </div>

  );
}