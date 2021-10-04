/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams, Redirect, Link } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

export default function ReviewNew() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (!currentUser) return <Redirect to="/login" />;

  return (
    <div className="box">
      <h3>Crea un nueva review </h3>
      <Formik
        initialValues={{
          comment: '',
        }}
        validationSchema={Yup.object({
          comment: Yup.string()
            .min(1, 'Title must be at least 1 character')
            .max(40, 'Title must be 40 characters or less')
            .required('This field is required'),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.access_token}`,
            },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/books/${id}/reviews`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('Review has been successfully created!');
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="field">
              <label htmlFor="comment" className="texto2">Comentario: </label>
              <p> </p>
              <Field name="comment" placeholder="Comment" className="field2" />
              {errors.comment && touched.comment ? (
                <div>{errors.comment}</div>
              ) : null}
            </div>
            <div className="field">
              <Field name="userId" type="hidden" className="field2" value={currentUser.id} />
            </div>
            <div className="field">
              <Field name="bookId" type="hidden" className="field2" value={id} />
            </div>
            <div className="actions">
              <button type="submit" className="button">Crear review</button>
            </div>
          </Form>
        )}
      </Formik>
      <Link className="link" to={`/books/${id}`}>Volver</Link>
      <p>{message}</p>
    </div>
  );
}