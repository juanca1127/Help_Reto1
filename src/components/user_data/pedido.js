import React, { useEffect} from "react";
import Tabla from "./tabla";
import Edit from "./datosCuenta";
import Idpedido from "./pedido_id";
import Datos from "./datos";

import { Routes, Route, NavLink } from "react-router-dom";

import CambioPassword from "./changePassword";
function Pedido() {

  let activeStyle = {
    borderLeft: "thick solid #F73A34",
  };
  let user = "";
  localStorage.getItem("User")
    ? (user = JSON.parse(localStorage.getItem("User")))
    : (user = "");
  const close = () => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  };

  const top = () => {
    var html = document.documentElement;
    html.scrollTop = 0;
  };
  useEffect(() => {
    top();
    document.title = `${process.env.REACT_APP_TITLE}| Pedidos`;

    close();
    document.querySelector(".equis").classList.add("d-none");
    document.querySelector(".ver").classList.remove("d-none");

    if (!localStorage.getItem("User")) {
      window.location = "/";
    }
  }, []);

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-4 col-12">
            <div className="alert alert-primary" role="alert">
              <h4 className="alert-heading">Hola, {user.nombre}</h4>
            </div>
            <br />
            <ul className="list-group">
              <NavLink
                to="cuenta/"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                className="list-group-item"
              >
                Mi cuenta
              </NavLink>

              <NavLink
                to="pedido/"
                className="list-group-item"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Mis pedidos
              </NavLink>
            </ul>

            <hr />
          </div>
          <div className="col-md-8  col-12">
            <Routes>
              <Route path="pedido/order/" element={<Idpedido />} exact />
              <Route path="cuenta/edit/" element={<Edit />} exact />
              <Route
                path="cuenta/password/"
                element={<CambioPassword />}
                exact
              />
              <Route path="cuenta/*" element={<Datos />} exact />
              <Route path="pedido/*" element={<Tabla />} exact />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
export default Pedido;
