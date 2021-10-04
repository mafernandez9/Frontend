import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LikesNew() {
  const { bookId, reviewId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
      body: { userId: currentUser?.id, reviewId },
    };
    fetch(`${process.env.REACT_APP_API_URL}api/books/${bookId}/reviews/${reviewId}/likes`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.data;
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      {/* <Link to="/">Volver</Link> */}
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <div className="box">
          <h2>Le diste Like a esta publicación</h2>
        </div>
      )}
    </div>
  );
}
