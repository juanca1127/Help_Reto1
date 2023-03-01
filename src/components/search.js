import React, { useState, useEffect } from "react";
import HelpSpinners from "components/spinners";

import LinkProducto from "./linkProducto";
const Search = () => {
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [tablaDatos, setTablaDatos] = useState([]);
 

  const top = () => {
    var html = document.documentElement;
    html.scrollTop = 0;
  };
  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaDatos.filter((elemento) =>
      elemento.nombre
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase()) ||
      elemento.descripcion
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase())
        ? elemento
        : resultadosBusqueda
    );

    setDatos(resultadosBusqueda);
  };
  useEffect(() => {
    top();
    document.title = `Busqueda | ${process.env.REACT_APP_TITLE}`;
    const inicio = async (e) => {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/producto`
      );
      const res = await data.json();
    
      setDatos(res);
      setTablaDatos(res);
      setLoading(false);
    };

    document.querySelector(".navbar-collapse").classList.remove("show");
   
    document.querySelector(".equis").classList.add("d-none");
    document.querySelector(".ver").classList.remove("d-none");
    inicio();
  }, []);

  const cambio = async (e) => {
    const { value } = e.target;
    document.title = `${value !== "" ? value : "busqueda"} | ${
      process.env.REACT_APP_TITLE
    }`;
    setBusqueda(value);
    filtrar(value);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-auto col-lg-8">
            <input
              onChange={cambio}
              id="caja_busqueda"
              value={busqueda}
              style={{
                border: "none",
                borderBottom: "2px solid",
                fontSize: "2em",
                marginTop: "3em",
              }}
              type="text"
              className="form-control"
              placeholder="BUSCADOR"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </div>
        </div>
      </div>
      {loading ? (
        <div className="carga">
          <HelpSpinners  size={300} />
        </div>
      ) : datos.length ? (
        datos.map((producto) => {
          return (
            <div
              className="d-flex justify-content-center col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-3"
              key={producto.codigo_producto}
            >
              <LinkProducto
                producto={producto}
              />
            </div>
          );
        })
      ) : (
        <>
          <div>
            <h1 className="mt-5">No se ha encontrado productos :( </h1>
          </div>
        </>
      )}
    </>
  );
};
export default Search;
