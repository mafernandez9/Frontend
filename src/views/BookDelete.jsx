import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function UserDelete() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser?.access_token}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}api/admin/books/${id}`, requestOptions)
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
      {!currentUser && <Redirect to="/login" />}
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <div className="box">
          <h2>Libro eliminado exitosamente</h2>
        </div>
      )}
    </div>
  );
}