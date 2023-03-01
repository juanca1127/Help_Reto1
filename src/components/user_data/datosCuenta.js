import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Cuenta = () => {
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    document.title = `Cambio de informacion | ${process.env.REACT_APP_TITLE} `;
  }, []);
  localStorage.getItem("User") ? <></> : (window.location = "/");
  const user = JSON.parse(localStorage.getItem("User"));
  const inicial = {
    accion: "update",
    apellido: user.apellido,
    direccion: user.direccion,
    email: user.email,
    id: user.id,
    cedula: user.cedula,
    municipio: user.municipio,
    nombre: user.nombre,
    pais: user.pais,
    telefono: user.telefono,
  };

  const [datos, setDatos] = useState(inicial);

  const [vali, setVali] = useState(false);
  var forms = document.querySelectorAll(".needs-validation");

  const cambio = (e) => {
    Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add("was-validated");
        setVali(false);
      } else {
        setVali(true);
      }
    });
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };
  const url = `${process.env.REACT_APP_SERVER_URL}`;
  const env = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (vali) {
      const res = await fetch(`${url}/registro`, {
        method: "PUT",
        body: JSON.stringify(datos),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.cc !== "ok") {
        Array.prototype.slice.call(forms).forEach(function (form) {
          e.stopPropagation();
          form.classList.remove("was-validated");

          form.elements.cedula.classList.add("is-invalid");
          let texto = document.querySelector(".cedula");
          texto.innerText = `${data.cc}`;
        });
      }
      if (data.email !== "ok") {
        Array.prototype.slice.call(forms).forEach(function (form) {
          e.stopPropagation();
          form.classList.remove("was-validated");

          form.elements.email.classList.add("is-invalid");
          let texto = document.querySelector(".email");
          texto.innerText = `${data.email}`;
        });
      }
      if (data.status) {
        localStorage.setItem("User", JSON.stringify({ ...datos }));
      } else {
        var html = document.documentElement;
        html.scrollTop = 10;
        let alerta = document.querySelector(".alert-danger");
        alerta.classList.remove("d-none");
        alerta.innerHTML = `error interno, Revise su informacion y vuelva a intentarlo `;
      }
    } else {
      Array.prototype.slice.call(forms).forEach(function (form) {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
          form.classList.add("was-validated");
        }
      });
    }
    setLoading(false);
  };
  return (
    <>
      <div className="col-xs-12 col-md-12 col-lg-12 ">
        <form
          onSubmit={env}
          className="needs-validation"
          noValidate
          method="post"
          autoComplete="off"
        >
          <div className="row g-3">
            <div className="col-sm-4">
              <label htmlFor="firstName" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                onChange={cambio}
                className="form-control"
                id="firstName"
                name="nombre"
                value={datos.nombre}
                required
              />
              <div className="invalid-feedback">Nombre es requerido.</div>
            </div>

            <div className="col-sm-4">
              <label htmlFor="lastName" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                onChange={cambio}
                className="form-control"
                id="lastName"
                name="apellido"
                value={datos.apellido}
                required
              />
              <div className="invalid-feedback">Apellido es requerido .</div>
            </div>
            <div className="col-sm-4">
              <label htmlFor="cedula" className="form-label">
                Cedula
              </label>
              <input
                type="number"
                onChange={cambio}
                className="form-control"
                id="cedula"
                name="cedula"
                value={datos.cedula}
                required
              />
              <div className="invalid-feedback cedula"></div>
            </div>
            <div className="col-sm-4">
              <label htmlFor="telefono" className="form-label">
                Telefono
              </label>
              <input
                type="number"
                onChange={cambio}
                className="form-control"
                id="telefono"
                name="telefono"
                value={datos.telefono}
                required
              />
              <div className="invalid-feedback">Telefono es requerido.</div>
            </div>

            <div className="col-8">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                onChange={cambio}
                className="form-control"
                id="email"
                name="email"
                value={datos.email}
                required
                placeholder="you@example.com"
              />
              <div className="invalid-feedback email">
                Por favor ingrese un email valido.
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="direccion" className="form-label">
                Direccion
              </label>
              <input
                type="text"
                onChange={cambio}
                className="form-control"
                id="direccion"
                name="direccion"
                value={datos.direccion}
                placeholder="Barrio, sector, calle carrera"
                required
              />
              <div className="invalid-feedback">
                Por favor ingrese una direccion valida.
              </div>
            </div>

            <div className="col-md-6">
              <label htmlFor="country" className="form-label">
                Pais
              </label>
              <select
                onChange={cambio}
                className="form-select"
                name="pais"
                id="country"
                value={datos.pais}
                required
              >
                <option value="">Seleccion</option>
                <option value="Colombia">Colombia</option>
              </select>
              <div className="invalid-feedback">Seleccione un pais</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="state" className="form-label">
                Ciudad
              </label>
              <select
                onChange={cambio}
                className="form-select"
                id="state"
                name="ciudad"
                value={datos.municipio}
                required
              >
                <option value="">Seleccion</option>
                <option value="Quibdo">Quibdo</option>
              </select>
              <div className="invalid-feedback">Seleccione su ciudad.</div>
            </div>
          </div>

          <br />
          <button className="w-100 btn btn-dark btn-lg" type="submit">
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Actualizar"
            )}
          </button>
          <button
            onClick={() => history(-1)}
            className="mt-2 w-100 btn btn-primary btn-lg"
            type="submit"
          >
            Volver
          </button>
        </form>
      </div>
    </>
  );
};
export default Cuenta;
