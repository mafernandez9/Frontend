import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function SingleReview(props) {
  let user;
  const { review, users, book } = props;
  const { currentUser } = useAuth();
  const pathreview = `${book.id}/reviews/${review.id}`;
  const pathlike = `${book.id}/reviews/${review.id}/like`;
  const pathreport = `${book.id}/reviews/${review.id}/report`;
  const pathedit = `/books/${book.id}/reviews/${review.id}/edit`;
  const pathdelete = `/books/${book.id}/reviews/${review.id}/delete`;
  let permission = false;
  //   const path = `/books/${book.id}/reviews/${review.id}`;
  //   const user =
  // console.log(users);
  users.forEach((userl) => {
    // console.log(review.userId);
    // console.log(userl.id);
    if (`${review.userId}` === userl.id) {
      user = userl;
    }
  });
  if (currentUser.id === review.userId) {
    permission = true;
  }
  return (
    <div className="container-review">
      <div className="review">
        <div id="left">
          <img alt="imagen de usuario" src={user.image} />
        </div>

        <div id="right">
          <div>
            <h4>
              {user.firstName}
              {' '}
              {user.lastName}
            </h4>
            <small>
              @
              {user.nickname}
            </small>
          </div>
          <div id="comment">
            {review.comment}
          </div>
          <Link className="link" to={pathreview}>Ver esta reseña</Link>
          <Link className="link" to={pathlike}> Me gusta</Link>
          <Link className="link" to={pathreport}> Reportar</Link>
          {permission ? (

            <Link className="link" to={pathdelete}> Eliminar</Link>
          ) : (
            <span />
          )}
          {permission ? (

            <Link className="link" to={pathedit}> Editar</Link>
          ) : (
            <span />
          )}

        </div>
      </div>
      <hr />
    </div>

  );
}

export default SingleReview;