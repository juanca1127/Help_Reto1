import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Recomendacion from "./recomendacion";
import { separarToPatch } from "components/util/util";
import RueSpinners from "components/spinners";

// import ModalTalla from "components/admin/modal/modalTalla";
function Producto({ cart, setCart }) {
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [rad, setRad] = useState(0);

  const top = () => {
    var html = document.documentElement;
    html.scrollTop = 50;
  };

  // console.log(estado);
  const generateId = async () => Math.random().toString(36).substr(2, 18);
  const setUserClientId = async () => {
    const res = await generateId();
    setRad(res);
  };

  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  useEffect(() => {
    top();

    const obtenerproducts = async () => {
      const url = await `${
        process.env.REACT_APP_SERVER_URL
      }/producto?id=${separarToPatch(id)}`;
      const data = await fetch(url);
      const product = await data.json();

      setProducts(product[0]);

      document.title = `${
        process.env.REACT_APP_TITLE
      } | Producto ${product[0].descripcion.toLowerCase()}`;

      setLoading(false);
    };
    obtenerproducts();
    if (document.querySelector('input[name="talla_option_c"]:checked')) {
      
      document.querySelector(
        'input[name="talla_option_c"]:checked'
      ).checked = false;
      let resultado = document.querySelector("#resultado");
      resultado.classList.add("d-none");
      setCantidad(1);
    }
  }, [id]);

  

  let can = document.querySelector(".cantidad");

  const cantidad_input = (e) => {
    const { name } = e.target;
    setUserClientId();

    if (name === "menos") {
      if (can.value === "1") {
        Swal.fire({
          title: "Denegado",
          icon: "warning",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });
      } else {
        let total = can.value - 1;
        setCantidad(total);
      }
    } else if (name === "mas") {
      if (parseInt(can.value) === parseInt(products.stock)) {
        Swal.fire({
          title: "Denegado",
          icon: "warning",
          timer: 2000,
          toast: true,
          showConfirmButton: false,
        });
      } else {
        let total = parseInt(can.value) + 1;
        setCantidad(total);
      }
    }
  };

  const producto = [
    {
      img1: `${products.img1}`,
      nombre: `${products.nombre}`,
      descripcion: `${products.descripcion}`,
      valor: products.valor,
      id_: `${rad}`,
      cantidad: `${cantidad}`,
      stock: products.stock,
      codigo_producto: `${products.codigo_producto}`,
    },
  ];

 
  // setUserClientId();
  const env = (e) => {
    e.preventDefault();
    setUserClientId();
    if (parseInt(can.value) > products.stock) {
      Swal.fire({
        title: "Verifique cantidad y talla disponible",
        icon: "warning",
        timer: 5000,
        toast: true,
        showConfirmButton: false,
      });
    } else {
      

      setCart([...cart, ...producto]);
      Swal.fire({
        title: "",
        icon: "success",
        timer: 2000,
        toast: true,
        position: "top-end",
        width: "10rem",
        showConfirmButton: false,
      });
    }
   
  };

  localStorage.setItem("CARRITO", JSON.stringify(cart));

  return (
    <>
      {loading ? (
        <div className="carga">
          <RueSpinners loading={loading} size={200} />
        </div>
      ) : (
        <>
          {/* <ModalTalla setShow={setShow} show={show} handleClose={handleClose} /> */}
          <div id="one" className="col-sm-12 col-md-8 mt-5">
            <div style={{ border: "none" }} className="card">
              <div  className="row">
                <div  className="col-12 ">
                <img
                style={{
                  width:'300px'
                }}
                          src={`${process.env.REACT_APP_SERVER_URL_IMG}/${products.img1}`}
                          className="d-block  img"
                          alt="..."
                        />
                 
                </div>
              
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-4 mt-5">
            <h3 className="center">
              {products.nombre} {products.descripcion}
            </h3>
           
            <h4
              className="text-muted"
              style={{
                color: "black",
                textAlign: "center",
              
              }}
            >
              {formatter.format(products.valor)}
            </h4>

            <div className="mt-5">
              <div className="row">
                <div className="col-12  mt-5">
                  <div
                    id="resultado"
                    className="alert alert-primary  d-flex justify-content-center"
                    role="alert"
                  >
                    {products.stock} en stock
                  </div>
                </div>

                <div className="col-4  mt-5">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      onClick={cantidad_input}
                      className="btn btn-dark "
                      name="menos"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      className="cantidad btn"
                      readOnly
                      name="cantidad"
                      value={cantidad}
                    />
                    <button
                      onClick={cantidad_input}
                      className="btn btn-dark "
                      name="mas"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col-8 mt-5 ">
                  <form onSubmit={env}>
                    <button
                      style={{ width: "80%", marginBottom: "4em" }}
                      type="submit"
                      id="ok"
                      className="btn btn-dark "
                    >
                      Comprar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12  mt-5">
            <Recomendacion title={"RECOMENDACION"} id={separarToPatch(id)} />
          </div>
        </>
      )}
    </>
  );
}
export default Producto;
