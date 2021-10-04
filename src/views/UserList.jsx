import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import Users from '../components/Users';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}api/users`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.data;
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, userList) => setUsers(userList));
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
        <Users users={users} />
      )}
    </div>
  );
}
