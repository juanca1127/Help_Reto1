import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Registro = ({ Isadmin, tabla, close, update, datosUser }) => {
  const history = useNavigate();

  const inicial = {
    apellido: "",
    password: "",
    cedula: "",
    area: "",
    id_rol: "1",
    nombre: "",
  };
  const [datos, setDatos] = useState(inicial);
  // console.log(update);
  useEffect(() => {
    document.title = ` Registro | ${process.env.REACT_APP_TITLE}`;
    update ? setDatos(datosUser) : <></>;
    // eslint-disable-next-line
  }, []);

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
  const env = async (e) => {
    e.preventDefault();

    if (vali) {
      const res = await fetch(`http://localhost/inventario/registro`, {
        method: update  ? "PUT" : "POST",
        body: JSON.stringify(datos),
      });
      const data = await res.json();
      // console.log(data);
      

      if (data.cc) {
        Array.prototype.slice.call(forms).forEach(function (form) {
          e.stopPropagation();
          form.classList.remove("was-validated");

          form.elements.cedula.classList.add("is-invalid");
          let texto = document.querySelector(".cedula");
          texto.innerText = `${data.cc}`;
        });
      }

      if (data.id_) {
        setDatos({ ...datos, id: data.id_ });
        Isadmin ? close() : <></>;
        Isadmin
          ? tabla()
          : localStorage.setItem(
              "User",
              JSON.stringify({ ...datos, id: data.id_ })
            );
        Isadmin ? <></> : history("/");
      } else if (data>0) {
        Swal.fire("Update!", "Your User has been Update.", "success");
      }else {
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
  };

  return (
    <>
      <div className="container">
        <div className=" d-flex justify-content-center alert alert-danger d-none mt-4">
          -
        </div>
        <div className="row g-5 justify-content-center">
          <div className="py-5 text-center">
            <h2> {update ? "Actualizar" : "Crear cuenta"} </h2>
          </div>

          <div className="col-xs-12 col-md-12 col-lg-8 ">
            <form
              onSubmit={env}
              className="needs-validation"
              noValidate
              method="post"
              
            >
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={datos.nombre}
                    onChange={cambio}
                    className="form-control"
                    id="firstName"
                    name="nombre"
                    required
                  />
                  <div className="invalid-feedback">Nombre es requerido.</div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    Apellido
                  </label>
                  <input
                    type="text"
                    value={datos.apellido}
                    onChange={cambio}
                    className="form-control"
                    id="lastName"
                    name="apellido"
                    required
                  />
                  <div className="invalid-feedback">
                    Apellido es requerido .
                  </div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="cedula" className="form-label">
                    Cedula
                  </label>
                  <input
                    type="number"
                    value={datos.cedula}
                    onChange={cambio}
                    className="form-control"
                    id="cedula"
                    name="cedula"
                    required
                  />
                  <div className="invalid-feedback cedula">
                    Cedula es requerida
                  </div>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="" className="form-label">
                    Area
                  </label>
                  <input
                    type="text"
                    value={datos.area}
                    onChange={cambio}
                    className="form-control"
                    id="area"
                    name="area"
                    required
                  />
                  <div className="invalid-feedback">Area es requerido.</div>
                </div>
                {update ? (
                  <></>
                ) : (
                  <div className={Isadmin ? `col-sm-6` : `col-sm-12`}>
                    <label htmlFor="" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      onChange={cambio}
                      className="form-control"
                      id="password"
                      name="password"
                      required
                    />
                    <div className="invalid-feedback">
                      Contraseña es requerida
                    </div>
                  </div>
                )}

                {Isadmin ? (
                  <div className="col-sm-6 ">
                    <label htmlFor="" className="form-label">
                      Roles
                    </label>
                    <select
                      onChange={cambio}
                      className="form-select"
                      name="id_rol"
                      id="rol"
                      required
                    >
                      <option value={datos.id_rol}>select</option>
                      <option value="2">Administrador</option>
                      <option value="1">Usuario</option>
                    </select>
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <button className="w-100 btn btn-dark btn-lg mt-5" type="submit">
                {update ? "Actualizar" : "Crear cuenta"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Registro;
