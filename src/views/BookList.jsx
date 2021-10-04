import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import Books from '../components/Books';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}api/books`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.data;
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, booksList) => setBooks(booksList));
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <Books books={books} />
      )}
    </div>
  );
}