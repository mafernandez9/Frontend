/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams, Redirect, Link } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

export default function NewReport() {
  const { bookId, reviewId } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  //   const pathbook = ``;

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (!currentUser) return <Redirect to="/login" />;

  return (
    <div className="box">
      <h3>Crea un nuevo reporte </h3>
      <Formik
        initialValues={{
          comment: '',
        }}
        validationSchema={Yup.object({
          content: Yup.string()
            .min(1, 'Comment must be at least 1 character')
            .max(100, 'Comment must be 100 characters or less')
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/books/${bookId}/reviews/${reviewId}/reports`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('Report has been successfully created!');
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
              <Redirect to={`/books/${bookId}`} />;
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="field">
              <label htmlFor="content" className="texto2">Comentario: </label>
              <p> </p>
              <Field name="content" type="textarea" placeholder="Content" className="field2" />
              {errors.content && touched.content ? (
                <div>{errors.content}</div>
              ) : null}
            </div>
            <Field name="userId" type="hidden" className="field2" value={currentUser.id} />
            <Field name="reviewId" type="hidden" className="field2" value={reviewId} />
            <div className="actions">
              <button type="submit" className="button">Enviar reporte</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
      <Link className="link" to={`/books/${bookId}`}>Volver</Link>
    </div>
  );
}