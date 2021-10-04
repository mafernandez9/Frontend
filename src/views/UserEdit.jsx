import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import axios from 'axios';
import UserEdit from '../components/UserEdit';
import useAuth from '../hooks/useAuth';

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}api/users/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.data;
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, userData) => setUser(userData));
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
          <UserEdit user={user} />
        </div>
      )}
    </div>
  );
}