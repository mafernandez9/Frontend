import React from 'react';
import '../styles/reviewDetail.css';
// import { Link } from 'react-router-dom';

function VisitReview(props) {
  let user;
  // const pathreview = `${book.id}/reviews/${review.id}`;
  // const pathlike = `${book.id}/reviews/${review.id}/like`;
  // const pathreport = `${book.id}/reviews/${review.id}/report`;
  const { review, users } = props;
  users.forEach((userl) => {
    if (`${review.userId}` === userl.id) {
      user = userl;
    }
  });

  return (
    <div className="container-review">
      <div className="newreview">
        <div id="left">
          <img alt="imagen de usuario" src={user?.image} />
        </div>
        <div id="right">
          <div>
            <h4>
              {user?.firstName}
              {' '}
              {user?.lastName}
            </h4>
            <small>
              @
              {user?.nickname}
            </small>
          </div>
          <div id="comment">
            {review.comment}
          </div>
        </div>
      </div>
      <hr />
      {/* <Link className="link" to={pathreview}>Ver esta reseña</Link>
      <Link className="link" to={pathlike}> Me gusta</Link>
      <Link className="link" to={pathreport}> Reportar</Link> */}
    </div>
  );
}

export default VisitReview;