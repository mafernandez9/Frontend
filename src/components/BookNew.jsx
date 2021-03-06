/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

export default function BookNew() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (!currentUser) return <Redirect to="/login" />;

  return (
    <div className="box">
      <h3>Crea un nuevo libro </h3>
      <Formik
        initialValues={{
          title: '',
          description: '',
          ISBN: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .min(1, 'Title must be at least 1 character')
            .max(40, 'Title must be 40 characters or less')
            .required('This field is required'),
          description: Yup.string()
            .min(5, 'Description must be at least 5 characters')
            .required('This field is required'),
          ISBN: Yup.string()
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/books`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('Book has been successfully created!');
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
              <label htmlFor="title" className="texto2">T??tulo: </label>
              <p> </p>
              <Field name="title" placeholder="T??tulo" className="field2" />
              {errors.title && touched.title ? (
                <div>{errors.title}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="description" className="texto2">Descripci??n o sinopsis: </label>
              <p> </p>
              <Field name="description" placeholder="Descripci??n o sinopsis" className="field2" />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="ISBN" className="texto2">ISBN: </label>
              <p> </p>
              <Field name="ISBN" placeholder="ISBN" className="field2" />
              {errors.ISBN && touched.ISBN ? (
                <div>{errors.ISBN}</div>
              ) : null}
            </div>
            <div className="field">
              <Field name="userId" className="field2" type="hidden" value={currentUser.id} />
            </div>
            <input type="hidden" name="image" value="https://lh3.googleusercontent.com/proxy/cgNUcNG9UpfwT5yXH-qxcAJaD62gsRXBOqLJ20_rEx0V3XA6zd7NIyFT_meaunnHXDILIULVs5mZEEhek6CuXlsvDxny3pKRIb7nPBNUSdd6w4Kz3YLnHeyF47H7" />
            <div className="actions">
              <button type="submit" className="button">Crear libro</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
}