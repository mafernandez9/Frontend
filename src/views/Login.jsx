/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/sessionNew.css';
import useAuth from '../hooks/useAuth';

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();

  const handleSubmit = async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/auth`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const user = await response.json();
      handleUserLogin(user);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      {currentUser && <Redirect to="/" />}
      <div className="box">
        <Link to="/">Go Back</Link>
        <p> </p>
        <h2>Login with your account</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="texto2" htmlFor="email">Email:</label>
            <p> </p>
            <input
              className="field2"
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="texto2" htmlFor="password">Password:</label>
            <p> </p>
            <input
              className="field2"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className="actions">
            <button className="buttonLogin" type="submit" disabled={!(values.email && values.password)}>Login</button>
          </div>
        </form>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
}
