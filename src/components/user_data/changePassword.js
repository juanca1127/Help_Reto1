import { useState } from "react";
import Swal from "sweetalert2";
const CambioPassword = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  const inicial = {
    id: user.id,
    actual: "",
    nueva: "",
  };
  const [datos, setDatos] = useState(inicial);
  const cambio = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };
  const env = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/clientes`, {
      method: "POST",
      body: JSON.stringify(datos),
    });
    const data = await res.json();

    if (data.error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${data.error}`,
      });
    } else if (data.status) {
      Swal.fire({
        icon: "success",
        title: "Hecho",
        text: `${data.status}`,
      });
      window.history.back();
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <div className="col">
            <input
              onChange={cambio}
              type="password"
              className="form-control"
              value={datos.actual}
              name="actual"
              placeholder="Contraseña Actual"
              aria-label="First name"
            />
          </div>
          <div className="col">
            <input
              onChange={cambio}
              type="password"
              value={datos.nueva}
              name="nueva"
              className="form-control"
              placeholder="Contraseña Nueva"
              aria-label="Last name"
            />
          </div>

          <div className="col-12 mt-4">
            <div className="d-grid gap-2">
              <button onClick={env} className={`btn btn-dark`} type="button">
                Cambiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CambioPassword;
