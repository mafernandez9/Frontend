import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import axios from 'axios';
import BookEdit from '../components/BookEdit';
import useAuth from '../hooks/useAuth';
import '../styles/bookProfile.css';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}api/books/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.data;
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, bookData) => setBook(bookData));
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
        <div>
          <BookEdit book={book} />
        </div>
      )}
    </div>
  );
}