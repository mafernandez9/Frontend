import React from 'react';
import '../styles/sessionNew.css';

function LoginUser() {
  return (
    <div className="box">
      <h2>Bienvenid@ a Bookkers</h2>
      <h3>Iniciar Sesión </h3>
      <form>
        <div clasName="field">
          <p className="texto2">Ingrese Correo</p>
          <input className="field2" type="text" id="email" name="email" />
        </div>
        <div clasName="field">
          <p className="texto2">Ingrese Contraseña</p>
          <input className="field2" type="password" id="password" name="password" />
        </div>
        <div className="actions">
          <input className="button" type="submit" value="Iniciar sesión" />
        </div>
      </form>
    </div>
  );
}

export default LoginUser;