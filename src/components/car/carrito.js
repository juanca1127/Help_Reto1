import Volver from "../button/volver";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Cart from "components/cart";
import "components/car/car.css";

const Carrito = ({ cart, setCart, setShowMenu, showMenu }) => {
  let history = useNavigate();
  const [rad, setRad] = useState(0);
  const [usert, setUser] = useState({});
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const [loading, setLoading] = useState(false);
  let total = 0;
  const generateId = () => Math.random().toString(36).substr(2, 19);
  let user = "";
  localStorage.getItem("User")
    ? (user = JSON.parse(localStorage.getItem("User")))
    : (user = "");

  const eliminar = (id) => {
    const cartN = cart.filter((producto) => producto.id_ !== id);
    setCart(cartN);
    local(cartN);
  };
  const local = (cartN) => {
    localStorage.setItem("CARRITO", JSON.stringify(cartN));
  };

  useEffect(() => {
    showMenu === "d-none" ? setShowMenu("true") : setShowMenu(" ");
    setUser(JSON.parse(localStorage.getItem("User")) );

    setRad(generateId());
    // eslint-disable-next-line
  }, []);

  localStorage.setItem("id_", JSON.stringify(rad));

  const env = async () => {
  
    if (user === "") {
      history("/login");
    } else {
      const total_pagar = {
        total_moneda: `${total}`,
      };
      const pedidoR = {
        id: usert.id,
        pedido: `${JSON.stringify(cart)}`,
        ref: `${rad}`,
        monto: `${JSON.stringify(total_pagar)}`,
      };
      localStorage.setItem("xtzfr", JSON.stringify(pedidoR));
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/pedido`, {
        method: "POST",
        body: JSON.stringify(pedidoR),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data)
  
      

      if (data.result.status === "ok") {
        history(`/pagos/${data.result.id_}`);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className={`row`}>
          <div className="col-12">
            <div
              style={{
                padding: "2px",
              }}
              className="alert text-center rosa"
              role="alert"
            >
              <div></div>
            </div>
          </div>
          <div className="col-6 mostrarCart">
            <div className="d-flex justify-content-between">
              <h6>PRODUCTO </h6>
              <h6>DESCRIPCION</h6>
              <h6>CANTIDAD</h6>
              <h6>TOTAL</h6>
            </div>
            <ul
              style={{
                border: "none",
              }}
              id="lista"
              className=" list-group mb-4"
            >
              {cart.map((producto) => {
                total += producto.valor * producto.cantidad;

                return (
                  <div
                    className="d-flex justify-content-between"
                    key={producto.id_}
                  >
                    <div className="d-flex ">
                      <div
                        className="card "
                        style={{ border: "none", width: "6rem" }}
                      >
                        <img
                          className="card-img-top"
                          src={
                            process.env.REACT_APP_SERVER_URL_IMG +
                            "/" +
                            producto.img1
                          }
                          alt="..."
                        />
                      </div>
                      <div style={{ marginLeft: "3em" }}>
                        <small className="mb-1">
                          {producto.nombre} {producto.descripcion} <br />
                        </small>

                        <button
                          title="Eliminar"
                          onClick={() => eliminar(producto.id_)}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            marginLeft: "2em",
                          }}
                          className="bi bi-trash"
                        ></button>
                      </div>
                    </div>

                    <div
                      className="btn-group "
                      role="group"
                      aria-label="Basic example"
                    >
                      <input
                        type="text"
                        className="cantidad btn"
                        readOnly
                        name="cantidad"
                        value={producto.cantidad}
                      />
                    </div>

                    {formatter.format(producto.valor * producto.cantidad)}
                  </div>
                );
              })}
            </ul>
          </div>

          <div className="col-12  condicion">
            <Cart cart={cart} setCart={setCart} show={"d-none"} />
          </div>

          <div className=" col-sm-12 col-md-6 col-xl-6 d-flex justify-content-center ">
            <div className="col-8">
              <h5 className="text-center mt-1">Suamry</h5>
              <div className="mt-4 d-flex justify-content-between">
                <span> Subtotal </span>
                <span> {formatter.format(total)} </span>
              </div>

              <hr />

              <div className="mt-5">
                <button onClick={env} className="btn w-100 cursive rosa pago">
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "CHECKOUT"
                  )}
                </button>
              </div>
              <div className="mt-2">
                <Volver type="button" clase={" btn w-100 cursive rosa "} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Carrito;
