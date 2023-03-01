import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function Idpedido() {
  let history = useNavigate();
  let total = 0;
  const [data, setData] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [direccion, setDireccion] = useState([]);
  const [Pais, setPais] = useState("COP");
  const formatterPeso = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: Pais,
    minimumFractionDigits: Pais === "COP" ? 0 : 2,
  });

  let { search } = useLocation();

  let query = new URLSearchParams(search);
  let id = query.get("id");

  const url = `${process.env.REACT_APP_SERVER_URL}/pedido?id=${id}`;
  let envio = 0;
  useEffect(() => {
    if (!localStorage.getItem("User") && !sessionStorage.getItem("User")) {
      history("/");
    }
    const tabla = async () => {
      const res = await fetch(url);
      const dato = await res.json();
      const pro = dato[0];

      setData(pro);
      setDireccion(JSON.parse(pro.direccion_envio));
      setPedido(JSON.parse(pro.pedido));

      let tran = JSON.parse(pro.monto);
      setPais(tran.moneda);
    };
    document.title = `Pedido #${id} | ${process.env.REACT_APP_TITLE} `;
    tabla();

    // eslint-disable-next-line
  }, [url]);
  Pais === "COP" ? (envio = 17500) : (envio = 30);

  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          <h1>Pedido #{data.id_pedido}</h1>
          <h4>{data.fecha}</h4>
        </li>
      </ul>
      <div className="table-responsive ">
        <table className="table  ">
          <thead>
            <tr>
              <th>Nombre </th>
              <th>Cantidad</th>
              <th> Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.map((pro) => {
              total += pro.precio * pro.cantidad;
              return (
                <tr key={pro.id_}>
                  <td>
                    <h6>
                      {pro.nombre} {pro.descripcion}
                    </h6>
                    <small
                      style={{ textTransform: "uppercase" }}
                      className="text-muted"
                    >
                      Talla : {pro.talla}
                    </small>
                  </td>
                  <td>
                    <h6> {pro.cantidad}</h6>
                  </td>

                  <td>{formatterPeso.format(pro.precio)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="container">
          <div className="row justify-content-end ">
            <div className="col-8 ">
              <ul className="list-group">
                <li className="list-group-item justify-content-between">
                  <h4>Subtotal </h4>
                  <small className="text-muted">
                    {formatterPeso.format(total)}
                  </small>
                </li>
                <li className="list-group-item justify-content-between">
                  <small>Gastos de envio </small>
                  <small className="text-muted">
                    {formatterPeso.format(envio)}
                  </small>
                </li>
                <li className="list-group-item justify-content-between">
                  <small>suma total </small>
                  <small className="text-muted">
                    {formatterPeso.format(total + envio)}
                  </small>
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-5">
            <div>
              <h3> Informacion del pedido</h3>
            </div>
            <hr />
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <h6> Datos de envio</h6>
                    </th>
                    <th>
                      <h6> Metodo de envio</h6>
                    </th>
                    <th>
                      <h6> Metodo de pago</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <h6>
                        {direccion.city} <br /> {direccion.country} <br />
                        {direccion.nombre} <br /> {direccion.address} <br />
                        {direccion.phone} <br /> {direccion.email}
                      </h6>
                    </td>
                    <td>
                      <h6> {data.metodo_envio}</h6>
                    </td>
                    <td>
                      <h6><a target="_blank" rel="noreferrer" href={`https://dashboard.stripe.com/payments/`+data.metodo_pago}>Ir a el datalle</a>
                        </h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Idpedido;
