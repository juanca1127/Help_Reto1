import React, { useEffect, useState } from "react";
import LinkProducto from "./linkProducto";

function Recomendacion({ id, title }) {

  const [productos, setProductos] = useState([]);
  

  useEffect(() => {

    const peticion = async()=>{
      const url =`${process.env.REACT_APP_SERVER_URL}/producto`;
      const res = await fetch(url);
        const data = await res.json();
        setProductos(data);
    }
    peticion();
   
    
  
  }, []);

  

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <h4 style={{ textAlign: "center", marginBottom: "2em" }}>{title}</h4>

          {productos.map((producto) => {
            return (
              <div
                className="d-flex justify-content-center col-6 col-sm-4 col-md-3 col-lg-3 col-xl-3 col-xxl-3 "
                key={producto.codigo_producto}
              >
                <LinkProducto
                  producto={producto}
          
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Recomendacion;
