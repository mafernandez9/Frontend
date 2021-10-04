/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import '../styles/session.css';
import useAuth from '../hooks/useAuth';

export default function UserEdit(props) {
  const { user } = props;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (!currentUser) return <Redirect to="/login" />;
  return (
    <div className="box">
      <h3>Edita tu perfil </h3>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          birthDay: '',
          nickname: '',
          password: '',
          passwordConfirmation: '',
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(3, 'Your name must be at least 3 characters')
            .max(15, 'Your name must be 15 characters or less')
            .required('This field is required'),
          lastName: Yup.string()
            .min(2, 'Your lastname must be at least 2 characters')
            .max(15, 'Your lastname must be 15 characters or less')
            .required('This field is required'),
          email: Yup.string()
            .email('Invalid email')
            .required('This field is required'),
          birthDay: Yup.date()
            .max(new Date(), 'Invalid birthdate'),
          nickname: Yup.string()
            .min(1, 'Your nickname must be at least 1 characters')
            .max(15, 'Your nickname must be 15 characters or less'),
          password: Yup.string()
            .min(6, 'Your password must be at least 6 characters')
            .max(15, 'Your password must be 15 characters or less')
            .required('Password is required'),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'Please accept terms and conditions'),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${currentUser?.access_token}`,
            },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}api/users/${user.id}`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('Usuario cambiado exitosamente!');
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
              <label htmlFor="firstName" className="texto2">First Name: </label>
              <Field name="firstName" className="field2" placeholder={user.firstName} />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="lastName" className="texto2">Last Name: </label>
              <Field name="lastName" placeholder={user.lastName} className="field2" />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="email" className="texto2">Email: </label>
              <Field name="email" placeholder={user.email} className="field2" />
              {errors.email && touched.email ? (
                <div>{errors.email}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="birthDay" className="texto2">Birthdate: </label>
              <Field name="birthDay" placeholder={user.birthDay} className="field2" type="date" />
              {errors.birthDay && touched.birthDay ? (
                <div>{errors.birthDay}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="nickname" className="texto2">Nickname: </label>
              <Field name="nickname" placeholder={user.nickname} className="field2" />
              {errors.nickname && touched.nickname ? (
                <div>{errors.nickname}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="password" className="texto2">Password: </label>
              <Field type="password" name="password" placeholder="Password" className="field2" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="passwordConfirmation" className="texto2">Password Confirmation: </label>
              <Field type="password" name="passwordConfirmation" placeholder="Password Confirmation" className="field2" />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div>{errors.passwordConfirmation}</div>
              ) : null}
            </div>
            <div className="field">
              <label htmlFor="acceptedTerms" className="texto2">Accept terms and conditions?</label>
              <Field type="checkbox" name="acceptedTerms" />
              {errors.acceptedTerms && touched.acceptedTerms ? (
                <div>{errors.acceptedTerms}</div>
              ) : null}
            </div>
            <input type="hidden" name="role" value="client" />
            <input type="hidden" name="image" value="https://i.ytimg.com/vi/HSpvOp4zLmg/maxresdefault.jpg" />
            <div className="actions">
              <button type="submit" className="button">Editar usuario</button>
            </div>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </div>
  );
}