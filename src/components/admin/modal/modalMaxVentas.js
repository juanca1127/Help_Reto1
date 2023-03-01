import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Grid } from "gridjs-react";
import "react-datepicker/dist/react-datepicker.css";
const ModalFecha = ({ show, handleClose }) => {
  const format = (data) => {
    let fecha = new Date(data);
    let año = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let fecha_y_m_d =
      año +
      "-" +
      (mes < 10 ? "0" + mes : mes) +
      "-" +
      (dia < 10 ? "0" + dia : dia);
    return fecha_y_m_d;
  };

  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [tablaFechas, setDataFecha] = useState([]);
  const env = async () => {
    const data1 = await fetch(`${process.env.REACT_APP_SERVER_URL}/sumaMes`, {
      method: "POST",
      body: JSON.stringify({
        desde: format(startDate),
        hasta: format(startDate1),
      }),
    });
    const res = await data1.json();
    console.log(res);
    setDataFecha(res);
    handleShow("xl-down");
  };

  const [fullscreen, setFullscreen] = useState(true);
  const [show2, setShow2] = useState(false);

  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow2(true);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Total Ventas segun su periodo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group mb-3">
            <div className="row ">
              <div col="4">
                <label> Desde</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </div>
            </div>
            <div col="4">
              <label> Hasta</label>
              <DatePicker
                selected={startDate1}
                onChange={(date) => setStartDate1(date)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={env}>
            Ejecutar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Button  className="me-2 mb-2" onClick={() => handleShow( 'xxl-down')}>
          Full screen
        
        </Button> */}

      <Modal
        show={show2}
        fullscreen={fullscreen}
        onHide={() => setShow2(false)}
      >
        <Modal.Header closeButton>
           <small>Total de ventas desde {format(startDate)} hasta {format(startDate1)}</small>
        </Modal.Header>
        <Modal.Body>
            
          <Grid
            data={tablaFechas}
            columns={[
              {
                id: "ventas_totales",
                name: "Ventas totales",
              },
            ]}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalFecha;
