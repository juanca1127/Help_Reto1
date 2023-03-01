import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import touch from "../assets/icons/iconoHelpeers.png";
import { useParams } from "react-router";
const Pagos = () => {
  const { id } = useParams();

  const inicial = {
    data: {
      id: "112785-1651951651-84818",
      monto: 50000000,
      ref: "hjdhgd2",
    },
  };

  const tabla = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/pedido?id=${id}`
      );
      const dato = await res.json();

      setdatosJson(dato[0]);

      setLoading(false);
    } catch (error) {
      window.location = "/404";
    }
  };
  useEffect(() => {
    tabla();
    localStorage.removeItem("id_");
    localStorage.removeItem("CARRITO");
    // eslint-disable-next-line
  }, []);

  const formatterPeso = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const [loading, setLoading] = useState(false);
  const [datosJson, setdatosJson] = useState(inicial);

  const months = [
    "ENE",
    "FEB",
    "MAR",
    "ABR",
    "MAY",
    "JUN",
    "JUL",
    "AGO",
    "SEP",
    "OCT",
    "NOV",
    "DIC",
  ];
  const formatDate = (fecha) => {
    let date = new Date(fecha);
    let formatted_date =
      date.getDate() +
      "-" +
      months[date.getMonth()] +
      "-" +
      date.getFullYear() +
      " / " +
      date.getHours() +
      ": " +
      date.getMinutes();
    return formatted_date;
  };

  // console.log(trans("175000"));
  return (
    <>
      {loading ? (
        <div className="carga">
          <HashLoader color={"#D0021B"} loading={loading} size={80} />
        </div>
      ) : (
        <>
          <div className="container">
            <div
              style={{ marginBottom: "10em", marginTop: "6em" }}
              className="row  "
            >
              <div
                style={{ textAlign: "center", borderRight: "2px dotted" }}
                className="col-6"
              >
                <img src={touch} className="mt-5" width="100%" alt="Help" />
                <h4>Tu pago fue exitoso</h4>
                <h5 className="text-muted mt-3">Resumen de tu transaccion</h5>
              </div>
              <div className="col-6">
                <div className="row">
                  <div
                    style={{ textAlign: "center", borderBottom: "2px dotted" }}
                    className="col-12  "
                  >
                    <h4> Valor del pago</h4>
                    <h2>{formatterPeso.format(`${datosJson.monto}`)}</h2>
                    <div
                      style={{ padding: "2px", borderRadius: "40px" }}
                      className="alert alert-success"
                      role="alert"
                    >
                      <h6>{formatDate(datosJson.fecha)}</h6>
                    </div>
                  </div>
                  <div className="col-12">
                    <h4 className="text-muted mt-4">No. de transaccion</h4>
                    <h6>{datosJson.id_pedido}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Pagos;
