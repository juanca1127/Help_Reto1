import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { convertToPath } from "components/util/util";

const Img = lazy(() => import("./img"));
const LinkProducto = ({  producto }) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0 ,
  });
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to={`/producto/${convertToPath(
        producto.descripcion + " " + producto.codigo_producto
      )}`}
    >
      <div className="card mt-4" style={{ border: "none" }}>
        <Suspense
          fallback={
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          }
        >
          <div className=" contenedor ">
            <Img
              url={producto.img1}
              clase={"img-fluid  card-img-top imagen"}
            />
          </div>
        </Suspense>

        <div className="card-body">
          <h6>
            {producto.nombre} {producto.descripcion}
          </h6>

          <h6 style={{ color: "#F60178", textAlign: "center" }}>
            {formatter.format(producto.valor)}
          </h6>
        </div>
      </div>
    </Link>
  );
};
export default LinkProducto;
