import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/userProfile.css';
import '../styles/books.css';
import SingleBook from './SingleBook';

function UserProfile(props) {
  const { user } = props;
  const { books } = props;
  const booksArray = books.filter((book) => `${book.userId}` === user.id);
  const path = `${user.id}/edit`;
  const path2 = `${user.id}/delete`;
  // const path3 = `/users/${user.id}/reviews`;
  return (
    <div className="profile">
      <div className="info-user">
        <h1>
          {user.firstName}
          {' '}
          {user.lastName}
        </h1>
        <img alt="user" src={user.image} />
        <h3>{user.nickname}</h3>
      </div>
      {/* <button className="boton-libro" id="boton-profile-libro" type="submit">
        <Link className="link" to={path3}>Mis reviews</Link>
      </button> */}
      <button className="boton-libro" id="boton-profile-libro" type="submit">
        <Link className="link" to={path}>Editar mi perfil</Link>
      </button>
      <button className="boton-libro" id="boton-profile-libro" type="submit">
        <Link className="link" to={path2}>Eliminar mi perfil</Link>
      </button>
      <h1>Mis libros</h1>
      <ul className="book-list">
        {booksArray.map((book) => (
          <SingleBook key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
}

export default UserProfile;
