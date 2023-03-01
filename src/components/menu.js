import "components/css/menu.css";
import Canvas from "./canvasCarrito/canvas";
import Search from "components/search";
import Producto from "components/producto";
import Pedido from "components/user_data/pedido";
import Carrito from "components/car/carrito";
import Err from "components/404";
import touch from "assets/icons/iconoHelpeers.png";
import React, { useState } from "react";
import "animate.css";

import { Routes, Route, Link } from "react-router-dom";
import menu from "assets/icons/menu.png";
import x from "assets/icons/x.png";
import bolsa from "assets/icons/bolsa.png";
import lupa from "assets/icons/lupa.png";
import user2 from "assets/icons/user2.png";
import Recomendacion from "components/recomendacion";

function Menu() {
  let inicial = [];
  let user = [];

  if (localStorage.getItem("CARRITO")) {
    inicial = JSON.parse(localStorage.getItem("CARRITO"));
  }

  if (localStorage.getItem("User")) {
    user = JSON.parse(localStorage.getItem("User"));
  }

  const [cart, setCart] = useState(inicial);

  const [userid] = useState(user);
  const [showMenu, setShowMenu] = useState(true);

  const salir = () => {
    localStorage.removeItem("User");
    if (localStorage.getItem("CARRITO")) {
      localStorage.removeItem("CARRITO");
    }
    window.location.reload();
  };

  const show = () => {
    let cat = document.querySelector("#collapseExampleCategoria");
    let menu = document.querySelector("#menu");
    let equis = document.querySelector(".equis");
    let ver = document.querySelector(".ver");

    if (menu.ariaExpanded === "true") {
      cat.classList.remove("show");
      ver.classList.add("d-none");
      equis.classList.remove("d-none");
    } else {
      equis.classList.add("d-none");
      ver.classList.remove("d-none");
    }
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav
            style={{ zIndex: "100" }}
            id="nav_"
            className={`${showMenu} navbar navbar-expand-lg navbar-light animate__animated    animate__lightSpeedInRight`}
          >
            <div className="container-fluid">
              <button
                id="menu"
                onClick={() => show()}
                className="d-lg-none tras"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <img className="ver " width="28px" src={menu} alt=".." />
                <img className="equis d-none" width="30px" src={x} alt=".." />
              </button>

              <Link to="/" className="navbar-brand  oc">
                <img width="150px" src={touch} alt="logo la rue" />
              </Link>
              

              <div id="dos"  className="d-flex justify-content-between">
                <button
                style={{
                  marginRight:'10px'
                }}
                  className="nav-link  tras"
                  aria-current="page"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  <img width="25px" src={bolsa} alt=".." />
                  <small style={{ color: "blue" }}>
                    {cart.length === 0 ? "" : cart.length}
                  </small>
                </button>
                <div style={{
                  marginRight:'10px'
                }}>
                <Link
                id="tres"
                to="/buscar"
                className="nav-link"
              >
                <img width="25px" src={lupa} alt=".." />
              </Link>
                </div>
              </div>
            </div>
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              {userid.length === 0 ? (
               <Link id="tres" to="/login" className="nav-link ">
               <img  style={{
                  marginRight:'10px'
                }} width="30px" src={user2} alt=".." />
             </Link>
              ) : (
                <>
                
                  <div
                    style={{ marginRight: "7em" }}
                    className="flex-shrink-0 dropdown"
                  >
                    
                    <button
                      className="b-t dropdown-toggle"
                      id="dropdownUser2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userid.nombre}
                    </button>
                    <ul
                      className="dropdown-menu mx-0 shadow"
                      style={{ width: "220px" }}
                      aria-labelledby="dropdownUser2"
                    >
                      {/* <li>
                        <Link
                          to="/consumer/cuenta"
                          className="dropdown-item d-flex gap-2 align-items-center"
                        >
                          <i className="bi bi-file-earmark-person"></i>
                          Datos
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          to="/consumer/pedido"
                          className="dropdown-item d-flex gap-2 align-items-center"
                        >
                          <i className="bi bi-box-seam"></i>
                          Pedidos
                        </Link>
                      </li> */}

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          onClick={() => salir()}
                          className="dropdown-item b-t  d-flex gap-2 align-items-center"
                        >
                          <i className="bi bi-box-arrow-left"></i>
                          Salir
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </nav>
          {/* < */}
          <Canvas cart={cart} setCart={setCart} />

          <Routes>
            <Route path="/" element={<Recomendacion />} />

            <Route path="/consumer/*" element={<Pedido />} />
            <Route path="*" element={<Err />} />

            <Route
              path={`/producto/:id`}
              exact
              element={<Producto cart={cart} setCart={setCart} />}
            />

            <Route path="/buscar" element={<Search />} exact />

            

            

            <Route
              path="/carrito"
              element={
                <Carrito
                  setShowMenu={setShowMenu}
                  showMenu={showMenu}
                  cart={cart}
                  setCart={setCart}
                />
              }
              exact
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Menu;
