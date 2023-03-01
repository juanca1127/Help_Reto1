import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function Datos() {
  useEffect(() => {
    if (!localStorage.getItem("User")) {
      window.location = "/";
    }
    document.title = `${process.env.REACT_APP_TITLE}| Mi cuenta`;
  }, []);
  let user = "";
  localStorage.getItem("User")
    ? (user = JSON.parse(localStorage.getItem("User")))
    : (user = "");
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Mi cuenta</h1>
          </div>
          <div className="col-12 mt-4">
            <h3>Informacion de la cuenta</h3>
          </div>
          <hr />
          <div className="col-12 ">
            <h4>Datos de contcto</h4>
            <h6>
              {user.nombre} {user.apellido}
            </h6>
            <h6> {user.email} </h6>
          </div>
          <div className="col-12 mt-3">
            <h6>
              <Link to={"edit/"}>Editar</Link> |
              <Link to="password/"> cambiar contraseña </Link>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
}
export default Datos;
