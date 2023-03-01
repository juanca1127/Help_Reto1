import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./signin.css";
import touch from "assets/icons/iconoHelpeers.png";

function Login({ isLogin, setIslogin, setIsadmin }) {
  let history = useNavigate();

  isLogin ? history(-1) : <> </>;
  const inicial = {
    email: "",
    password: "",
  };

  const [datos, setDatos] = useState(inicial);

  const cambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const env = async (e) => {
    e.preventDefault();
    let log = document.getElementById("login");
    log.innerHTML =
      '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>';
    if (datos !== "") {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth`, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      log.innerText = "Re intentar";

      if (data.id) {
        const info = {

          id: data.id,
          cedula: data.cedula,
          nombre: data.nombre,
          area:data.area,
          apellido: data.apellido,
          rol: data.rol,
        };

        if (data.rol === "2") {
         
          localStorage.setItem("IsAdmin", true);
          setIsadmin(true);
          history(`/usuario`);
          
        }
        localStorage.setItem("User", JSON.stringify(info));
        setIslogin(true);
        history(`/`);
      } else {
        let alerta = document.querySelector(".alert-danger");
        alerta.classList.remove("d-none");
        alerta.innerHTML = `${data.result.error_msg}`;
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-12 mt-4 d-flex justify-content-center">
            <main className="form-signin mt-5">
              <form onSubmit={env}>
                <div className="d-flex justify-content-center">
                  <a href="../">
                    <img width="150px" src={touch} alt="" />
                  </a>
                </div>
                <div
                  style={{ textTransform: "uppercase" }}
                  className="alert alert-danger mt-4 d-none"
                  role="alert"
                ></div>
                <div className="form-floating mt-3">
                  <input
                    onChange={cambio}
                    type="number"
                    className="form-control"
                    id="cedula"
                    name="cedula"
                    placeholder="@1077.."
                    required
                  />
                  <label htmlFor="cedula">Cedula de ciudadania </label>
                  <div className="invalid-feedback">cedula obligatorio</div>
                </div>
                <div className="form-floating">
                  <input
                    onChange={cambio}
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <label htmlFor="password">Contraseña</label>
                  <div className="invalid-feedback">Password obligatorio</div>
                </div>

                <button
                  id="login"
                  className="w-100 btn btn-lg btn-primary"
                  type="submit"
                >
                  Sign in
                </button>
                <div className="mt-4">
                <a href="/registro" >Registro ?</a>
              </div>
              </form>
              
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
