import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

import { Link } from "react-router-dom";
function Tabla() {
  const [loading, setLoading] = useState(true);
  let user = "";
  localStorage.getItem("User")
    ? (user = JSON.parse(localStorage.getItem("User")))
    : (user = "");
  const [data, setData] = useState([]);


  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/pedido?id=${user.id}`;

    const tabla = async () => {
      const res = await fetch(url);
      const data = await res.json();

      setData(data);
      setLoading(false);
    };
    tabla();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="table-responsive">
      {loading ? (
        <div style={{ marginLeft: "25em", marginTop: "5em" }}>
          <HashLoader color={"#D0021B"} loading={loading} size={50} />
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th> # Pedido </th>
              <th>Fecha</th>
              <th>Enviar a</th>
              <th>Total pedido</th>
              <th>--</th>
              <th> Estado</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pedido) => {
              return (
                <tr key={pedido.id_pedido}>
                  <th scope="row">#{pedido.id_pedido} </th>
                  <td>{pedido.fecha}</td>
                  <td>{pedido.nombre}</td>
                  <td>
                    {JSON.parse(pedido.monto).moneda}{" "}
                    {JSON.parse(pedido.monto).total_moneda}
                  </td>
                  <td>
                    {pedido.estado === "PENDIENTE" ? (
                      <></>
                    ) : (
                      <>
                        <Link
                          to={`order/?id=${pedido.codigo_usuario}&cod=${pedido.id_pedido}`}
                        >
                          ver pedido
                        </Link>
                      </>
                    )}
                  </td>
                  <td> {pedido.estado}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Tabla;
