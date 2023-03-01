import { Grid } from "gridjs-react";
import { useEffect, useState } from "react";
const Log = () => {
  const [tablaFechas, setDataFecha] = useState([]);

  useEffect(() => {
    const env = async () => {
      const data1 = await fetch(`${process.env.REACT_APP_SERVER_URL}/log`)
      const res = await data1.json();
      console.log(res);
      setDataFecha(res);
      // handleShow("xl-down");
    };

    env();
  }, []);
  return (
    <>
      <div className="container mt-4">
        <div className="col-12">
          <Grid
            data={tablaFechas}
            columns={[
              {
                id: "id_log",
                name: " #",
              },
              {
                id: "registro",
                name: "Descripcion",
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
export default Log;
