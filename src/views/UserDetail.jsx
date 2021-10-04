import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import useAuth from '../hooks/useAuth';
// import Books from '../components/Books';

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setDidMount(true);
    setLoading(true);
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}api/users/${id}`),
      axios.get(`${process.env.REACT_APP_API_URL}api/books`),
    ])
      .then(([responseUser, responseBooks]) => {
        if (responseUser.status !== 200 || responseBooks.status !== 200) {
          setError(true);
          return {};
        }
        return [responseUser.data, responseBooks.data];
      })
      .then(([dataUser, dataBooks]) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(dataUser, (_error, userData) => setUser(userData));
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(dataBooks, (_error, booksData) => setBooks(booksData));
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
          <UserProfile user={user} books={books} />
        </div>
      )}
    </div>
  );
}