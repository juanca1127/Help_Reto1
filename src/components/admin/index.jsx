import { useNavigate, Routes, Route, NavLink } from "react-router-dom";
import Productos from "./productos";
import ProductoId from "./producto_id";
import UsuarioId from "./usuario_id";
import Usuario from "./usuario";
import Ventas from "./ventas";
import Log from "./log";
const Sidebar = () => {
  let history = useNavigate();
  const salir = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("IsAdmin");
    history(`/`);
    window.location.reload();
  };
  return (
    <div className="fondo">
      <header
        id="nav__"
        className="navbar navbar-dark sticky-top  flex-md-nowrap p-0 shadow"
      >
        <NavLink
          className="navbar-brand col-md-3 col-lg-2 me-0 px-3 text-dark"
          to="/user"
        ></NavLink>
        <button
          onClick={salir}
          style={{ border: "none", background: "none", fontSize: "25px" }}
          className="text-dark nav-link px-3 power-si"
        >
          <i className="bi bi-power"></i>
        </button>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="navbar-nav">
          <div className="nav-item text-nowrap power-none">
            <button
              onClick={salir}
              style={{ border: "none", background: "none", fontSize: "25px" }}
              className=" text-dark nav-link px-3"
            >
              <i className="bi bi-power"></i>
            </button>
          </div>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block  sidebar collapse "
          >
            <div className="position-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink to="/usuario" className="nav-link ">
                    Usuarios
                    <i className="bi bi-person ml"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/productos" className="nav-link ">
                    Productos
                    <i className="bi bi-box-seam ml"></i>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/ventas" className="nav-link ">
                    Ventas
                    <i className="bi bi-currency-dollar ml"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/log" className="nav-link ">
                    Log registro
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-bug-fill ml"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A4.985 4.985 0 0 0 3 6h10a4.985 4.985 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A4.978 4.978 0 0 0 8 1a4.979 4.979 0 0 0-2.731.811l-.29-.956z" />
                      <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5H13zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975z" />
                    </svg>
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
          <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Routes>
              <Route path="/productos/:id" element={<ProductoId />} exact />
              <Route path="/usuario/:id" element={<UsuarioId />} exact />
              <Route path="/productos" element={<Productos />} exact />
              <Route path="/" element={<Usuario />} exact />
              <Route path="/usuario" element={<Usuario />} exact />
              <Route path="/ventas" element={<Ventas />} exact />
              <Route path="/log" element={<Log />} exact />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
