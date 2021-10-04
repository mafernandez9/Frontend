import React from 'react';
import SingleUser from './SingleUser';
import SearchBar from './SearchBar';
import '../styles/users.css';
// import portada from '../portada.jpg';
// import bookArray from '../data/books.js/index.js;

function Users(props) {
  const { users } = props;

  return (
    <div className="users">
      <div id="title-comunidad">
        <h3 className="title">Comunidad</h3>
      </div>
      <SearchBar />
      <div className="user-list">
        {users.map((user) => (
          <SingleUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
