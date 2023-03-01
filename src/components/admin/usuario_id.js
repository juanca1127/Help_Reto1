import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Registro from "components/logins/registro"
// import Swal from "sweetalert2";
import HelpSpinners from "components/spinners";
const UsuarioId = () => {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const obtenerproducts = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/usuario?id=${id}`
      );
      const product = await data.json();

      setProducts(product[0]);
setTimeout(() => {
  setLoading(false);
}, 1050);
     
    };

    obtenerproducts();
  }, [id]);
 return(<>{loading ?  (
  <div className="carga">
    <HelpSpinners loading={loading} size={300} />
  </div>
) : (<Registro Isadmin={true} datosUser={products} update={true} />)} </>)
};

export default UsuarioId;
