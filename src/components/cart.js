import React from "react";

const Cart = ({ cart, setCart, show }) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  let total = 0;
  let can = 0;

  const eliminar = (id) => {
    const cartN = cart.filter((producto) => producto.id_ !== id);

    setCart(cartN);
    local(cartN);
  };
  const local = (cartN) => {
    localStorage.setItem("CARRITO", JSON.stringify(cartN));
  };

  return (
    <>
      {cart.map((producto) => {
      can =  producto.cantidad > producto.stock
      ? producto.stock
      : producto.cantidad
        total += producto.valor * producto.cantidad;

        return (
          <div key={producto.id_} className="list-group">
            <div className="d-flex justify-content-between  mt-2">
              <div className="card " style={{ border: "none", width: "4rem" }}>
                <img
                  className="card-img-top"
                  src={
                    process.env.REACT_APP_SERVER_URL_IMG + "/" + producto.img1
                  }
                  alt="..."
                />
              </div>
              <div style={{ marginLeft: "1em" }}>
                <small style={{ fontSize: "12px" }} className="mb-1">
                  {producto.nombre} <br />
                  {producto.descripcion} <br />
                </small>
                <div className=" justify-content-between d-flex">
                  <small
                    style={{ fontSize: "12px", marginLeft: "1em" }}
                    className="text-muted"
                  >
                    Unx.{can}
                    
                  </small>
                  <small
                    style={{
                      fontSize: "13px",
                      marginLeft: "1em",
                      color: "green",
                    }}
                  >
                    {formatter.format(producto.valor)}
                  </small>
                </div>
              </div>

              <div>
                <button
                  title="Eliminar"
                  onClick={() => eliminar(producto.id_)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    marginLeft: "5em",
                  }}
                  className="bi bi-trash"
                ></button>
              </div>
            </div>
          </div>
        );
      })}
      <hr />
      <ol className="list-group  inferior">
        <li
          style={{ border: "none" }}
          className="list-group-item d-flex justify-content-between align-items-start"
        >
          <div className={`ms-2 me-auto ${show}`}>
            <div className="fw-bold">Total</div>
          </div>
          <span className={`badge rosa rounded-pill ${show}`}>
            {formatter.format(total)}
          </span>
        </li>
        <a href="/carrito" className={`btn rosa cursive btn-sm ${show}`}>
          Ir a pagar
        </a>
      </ol>
    </>
  );
};

export default Cart;
