import React from 'react';

function SingleReviewUser(props) {
//   let user;
  const { user } = props;
  //   const pathreview = `${book.id}/reviews/${review.id}`;

  //   const path = `/books/${book.id}/reviews/${review.id}`;
  //   const user =
  // console.log(users);
  //   users.forEach((userl) => {
  //     // console.log(review.userId);
  //     // console.log(userl.id);
  //     if (`${review.userId}` === userl.id) {
  //       user = userl;
  //     }
  //   });
  const review = {
    id: 1,
    comment: 'Muy buen libro pero avanza muy lento la historia, lo cual lo hace aburrido en algunos momentos. Aun así el final es muy bueno.',
  };

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
          {/* <Link className="link" to={pathreview}>Ver esta reseña</Link> */}
        </div>
      </div>
      <hr />
    </div>

  );
}

export default SingleReviewUser;