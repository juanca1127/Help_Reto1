import React, { useState, useEffect } from "react";
import { Grid } from "gridjs-react";
import HelpSpinners from "components/spinners";
import ModalFecha from "components/admin/modal/modalFechas";
import ModalMaxVentas from "components/admin/modal/modalMaxVentas"
const Ventas = () => {
  const [loading, setLoading] = useState(true);
  const [tabla, setTabla] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);

  const tablaF = async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/ventas`);
    const data = await res.json();
    setTabla(data);
    setTimeout(() => {
      setLoading(false);
    }, 1050);
  };

  useEffect(() => {
    tablaF();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <div className="carga">
          <HelpSpinners loading={loading} size={300} />
        </div>
      ) : (
        <>
          <div className="container text-center mt-4">
            <div className="row justify-content-md-center animate__animated   animate__slower  animate__zoomInDown">
              <div
                className=" col-4 btn-group "
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  onClick={() => setShow(true)}
                  className="btn btn-primary"
                  title="reporte de productos mas vendidos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-file-earmark-bar-graph"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v6zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z" />
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                  </svg>
                </button>

                {/* <button
                  type="button"
                  
                  className="btn btn-primary"
                >
                    ventas
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
                </button> */}

                <button
                  type="button"
                     onClick={() => setShow1(true)}
                  className="btn btn-success"
                  title="Reporte de venta Mensual"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-currency-dollar"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                  </svg>
                </button>
              </div>
            </div>

            <ModalFecha
              handleClose={handleClose}
              setShow={setShow}
              show={show}
            />

            <ModalMaxVentas
              handleClose={handleClose1}
              setShow={setShow1}
              show={show1}
            />
          </div>

          <Grid
            data={tabla}
            columns={[
              {
                id: "id_ventas",
                name: " #",
              },
              {
                id: "fecha",
                name: "Fecha",
              },
              {
                id: "cantidad",
                name: "Cantidad",
              },

              {
                id: "monto",
                name: "Monto",
              },
              {
                id: "codPro",
                name: "Codigo",
              },
              {
                id: "nombre",
                name: "Nombre",
              },
              {
                id: "descripcion",
                name: "Descripción",
              },
              {
                id: "costo",
                name: "Costo",
              },
              // {
              //   name: "Actions",
              //   formatter: (cell, row) =>
              //     _(
              //       <div
              //         className="btn-group"
              //         role="group"
              //         aria-label="Basic example"
              //       >
              //         <button
              //           className={"btn btn-danger"}
              //           title="Eliminar usuario"
              //           onClick={() => console.log(row.cells[0].data)}
              //         >
              //           <svg
              //             xmlns="http://www.w3.org/2000/svg"
              //             width="16"
              //             height="16"
              //             fill="currentColor"
              //             class="bi bi-person-dash-fill"
              //             viewBox="0 0 16 16"
              //           >
              //             <path
              //               fill-rule="evenodd"
              //               d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
              //             />
              //             <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              //           </svg>
              //         </button>
              //         <button
              //           className={"btn btn-primary"}
              //           title="Editar usuario"
              //           onClick={() => console.log(row.cells[0].data)}
              //         >
              //           <svg
              //             xmlns="http://www.w3.org/2000/svg"
              //             width="16"
              //             height="16"
              //             fill="currentColor"
              //             class="bi bi-pencil-square"
              //             viewBox="0 0 16 16"
              //           >
              //             <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              //             <path
              //               fill-rule="evenodd"
              //               d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              //             />
              //           </svg>
              //         </button>
              //       </div>
              //     ),
              // },
            ]}
            search={true}
            pagination={{
              enabled: true,
              limit: 7,
            }}
          />
        </>
      )}
    </>
  );
};
export default Ventas;
