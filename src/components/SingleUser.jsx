import React from 'react';
import { Link } from 'react-router-dom';

function SingleUser(props) {
  const { user } = props;
  const path = `/users/${user.id}`;
  return (
    // <li className="single-user">
    //   <img alt="book" src={book.img} />
    //   <h3>{book.title}</h3>
    //   <button className="boton-libro" type="submit">
    //     <Link className="link" to={path}>Ver libro</Link>
    //   </button>
    // </li>
    <div className="card" id="user-card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={user.image} alt="user" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          {/* <div className="media-left">
            <figure className="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
            </figure>
        </div> */}
          <div className="media-content">
            <Link className="link" to={path}>
              <p className="title is-4">
                {user.firstName}
                {' '}
                {user.lastName}
              </p>
            </Link>
            <p className="subtitle is-6">
              @
              {user.nickname}
            </p>
          </div>
        </div>

        {/* <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br />
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div> */}
      </div>
    </div>
  );
}

export default SingleUser;