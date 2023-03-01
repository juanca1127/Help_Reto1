import React, { useState, useEffect } from "react";

import HelpSpinners from "components/spinners";
import { Grid, _ } from "gridjs-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ModalRegistro from "components/admin/modal/registro";

const Ventas = () => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  
  const [tabla, setTabla] = useState([]);
  const handleClose = () => setShow(false);


  const tablaF = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/usuario`);
    const data = await res.json();
    setTabla(data);
    setTimeout(() => {
      setLoading(false);
    }, 1050);
  };

  
  const History = useNavigate();
 
  const Deletelink = async (data) => {
    const alert = await Swal.fire({
      title: "Desea eliminar esto ?",
      text: data,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
    });
    if (alert.isConfirmed) {
      const data1 = await fetch(`${process.env.REACT_APP_SERVER_URL}/usuario`, {
        method: "DELETE",
        body: data,
      });
      const res = await data1.json();
      // console.log(res);
      if (res>0) {
        Swal.fire({
          title: "",
          icon: "success",
          timer: 2000,
          toast: true,
          position: "top-end",
          width: "10rem",
          showConfirmButton: false,
        });
        tablaF();
      } else {
        Swal.fire("No se pudo eliminar");
      }
    } else {
      Swal.fire("-");
    }
  };
  useEffect(() => {
    tablaF();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="" style={{ height: "100vh", marginTop: "5%" }}>
      {loading ? (
        <div className="carga">
          <HelpSpinners loading={loading} size={300} />
        </div>
      ) : (
        <>
          <div className="container text-center mb-4">
            <div className="row justify-content-md-end animate__animated   animate__slower  animate__zoomInDown">
              <div
                className=" col-4 btn-group "
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  onClick={() => setShow(true)}
                  className="btn btn-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-person-add"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                  </svg>
                </button>
              
              </div>
            </div>
          </div>

          <ModalRegistro
            show={show}
            tabla={tablaF}
            setShow={setShow}
            handleClose={handleClose}
          />
          <Grid
            data={tabla}
            columns={[
              {
                id: "id",
                name: " #",
              },
              {
                id: "cedula",
                name: "Cedula",
              },
              {
                id: "nombre",
                name: "Nombre",
              },

              {
                id: "apellido",
                name: "Apellido",
              },
              {
                id: "area",
                name: "Area",
              },
              {
                id: "rol",
                name: "Rol de usuario",
              },
              {
                name: "Actions",
                formatter: (cell, row) =>
                  _(
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button
                        className={"btn btn-danger"}
                        title="Eliminar usuario"
                        onClick={() => Deletelink(row.cells[0].data)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-dash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                          />
                          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>
                      </button>
                      <button
                        className={"btn btn-primary"}
                        title="Editar usuario"
                        onClick={ ()=> History(`/usuario/${`${row.cells[0].data}`}`)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </button>
                    </div>
                  ),
              },
            ]}
            search={true}
            pagination={{
              enabled: true,
              limit: 7,
            }}
          />
        </>
      )}
    </div>
  );
};
export default Ventas;
