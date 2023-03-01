import React, { useEffect, useState, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import HelpSpinners from "components/spinners";
const Img = lazy(() => import("../img"));
const Productos = () => {
  const [loading, setLoading] = useState(true);
   const [tablaDatos, setTablaDatos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const formatterPeso = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaDatos.filter((elemento) =>
      elemento.nombre
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase()) ||
      elemento.descripcion
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase())
        ? elemento
        : resultadosBusqueda
    );

    setData(resultadosBusqueda);
  };
  const btnSearch = async (e) => {
    const { value } = e.target;
    setBusqueda(value);
    filtrar(value);
  };
  let inicial = {
    nombre: "",
    descripcion: "",
    stock: "",
    costo: "",
    valor: "",
    imagen: "",
  };
  const [data, setData] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);
  const [products, setProducts] = useState(inicial);

  const url = `${process.env.REACT_APP_SERVER_URL}/producto`;

  const tabla = async () => {
    const res = await fetch(url);
    const data = await res.json();

    setData(data);
    setTablaDatos(data);
    setTimeout(() => {
      setLoading(false);
    }, 1050);
  };
  const change = (e) => {
    const { name, value } = e.target;

    setProducts({ ...products, [name]: value });
  };

  const borrar = (data) => {

    Swal.fire({
      title: "Desea eliminar esto ?",
      text: data.nombre + " " + data.descripcion,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_SERVER_URL}/producto`, {
          method: "DELETE",
          body: data.codigo_producto,
        });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
      tabla();
    });
  };

  const cerrar = () => {
    document.getElementById("cerrar").click();
    for (let i = 0; i < 3; i++) {
      if (i === 0) {
        document.getElementById("render1").innerHTML = " ";
        document.getElementById("render2").innerHTML = " ";

        let preview = document.getElementById("render1"),
          image = document.createElement("div");
        image.classList.add("img");
        image.classList.add("bg-negro");

        preview.append(image);
        let preview2 = document.getElementById("render2"),
          div = document.createElement("div");
        div.classList.add("carousel-item");
        if (i === 0) {
          div.classList.add("active");
        }
        preview2.append(div);
        let imagen2 = document.createElement("div");

        imagen2.classList.add("bg-negro");
        imagen2.style.height = "300px";

        div.append(imagen2);
      }
    }
    setProducts(inicial);
    tabla();
  };

  const env = async (e) => {
    setBtnLoad(true);
    let multiple_img = document.getElementById("inputArchivos");
    let formData = new FormData();
    const archivosParaSubir = multiple_img.files;

    for (const archivo of archivosParaSubir) {
      formData.append("img[]", archivo);
    }
    formData.append("accion", "INSERTAR");
    formData.append("datos", JSON.stringify(products));

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/add_productos`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    setBtnLoad(false);

    if (data > 0) {
      tabla();
      Swal.fire({
        title: "",
        icon: "success",
        timer: 2000,
        toast: true,
        position: "top-end",
        width: "10rem",
        showConfirmButton: false,
      });
      cerrar();
    } else {
      Swal.fire({
        title: `${data}`,
        icon: "warning",
        timer: 5000,
        toast: true,
        showConfirmButton: false,
      });
    }
  };

  const carga = (e) => {
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    let m = {};
    for (let i = 0; i < filesArr.length; i++) {
      const { name } = filesArr[i];
      if (i === 0) {
        document.getElementById("render2").innerHTML = " ";
        m.imagen = name;
      }

      setProducts({
        ...products,
        imagen: m.imagen,
      });

      let reader = new FileReader();

      reader.readAsDataURL(e.target.files[i]);
      reader.onload = function () {
        let preview2 = document.getElementById("render2"),
          div = document.createElement("div");
        div.classList.add("carousel-item");
        if (i === 0) {
          div.classList.add("active");
        }
        preview2.append(div);
        let imagen2 = document.createElement("img");
        imagen2.classList.add("d-block");
        imagen2.classList.add("w-100");
        imagen2.classList.add("img");
        imagen2.src = reader.result;
        div.append(imagen2);
      };
    }
  };

  useEffect(() => {
    document.title = "Admin | Productos";
    tabla();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <div className="carga">
          <HelpSpinners loading={loading} size={300} />
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between animate__animated   animate__slower  animate__zoomInDown">
            <div className="col-4">
              <input
                onChange={btnSearch}
                id="caja_busqueda"
                value={busqueda}
                style={{
                  border: "none",
                  borderBottom: "2px solid",
                  fontSize: "2em",
                  marginTop: "3em",
                }}
                type="text"
                className="form-control"
                placeholder="BUSCADOR"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
            </div>
            <div className="col-4 ">
              <button
                data-bs-toggle="modal"
                data-bs-target="#staticBackdropPlus"
                style={{
                  border: "none",
                  marginTop: "3.5em",
                  // left: "30%",
                }}
                className="btn btn-primary btn-lg w-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-plus-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            {/* Modal */}
            <div
              className="modal fade"
              id="staticBackdropPlus"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex={-1}
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                      Agregar producto
                    </h5>
                    <button
                      id="cerrar"
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    />
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div id="one" className="col-sm-12 col-md-6 ">
                        <div style={{ border: "none" }} className="card">
                          <div className=" row">
                            <div className=" col-md-12 col-sm-12 mt-2">
                              <span
                                data-name="POST"
                                title="Subir foto a el server"
                                style={{ top: "1%", left: "95%" }}
                                className="circulo"
                              >
                                <label className="custom-file-upload-img">
                                  <input
                                    multiple
                                    type="file"
                                    onChange={carga}
                                    className="form-control"
                                    id="inputArchivos"
                                  />

                                  <i
                                    style={{
                                      pointerEvents: "none",
                                      fontSize: "20px",
                                    }}
                                    className="bi bi-upload"
                                  ></i>
                                </label>
                              </span>
                              <div
                                id="carouselExampleIndicators"
                                className="carousel slide"
                                data-bs-ride="carousel"
                              >
                                <div id="render2" className="carousel-inner">
                                  <div className="carousel-item active">
                                    <div
                                      style={{ height: "300px" }}
                                      className="bg-negro"
                                    ></div>
                                  </div>
                                  <div className="carousel-item">
                                    <div
                                      style={{ height: "300px" }}
                                      className="bg-negro"
                                    ></div>
                                  </div>
                                  <div className="carousel-item">
                                    <div
                                      style={{ height: "300px" }}
                                      className="bg-negro"
                                    ></div>
                                  </div>
                                </div>
                                <button
                                  className="carousel-control-prev"
                                  type="button"
                                  data-bs-target="#carouselExampleIndicators"
                                  data-bs-slide="prev"
                                >
                                  <span
                                    className="carousel-control-prev-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span className="visually-hidden">
                                    Previous
                                  </span>
                                </button>
                                <button
                                  className="carousel-control-next"
                                  type="button"
                                  data-bs-target="#carouselExampleIndicators"
                                  data-bs-slide="next"
                                >
                                  <span
                                    className="carousel-control-next-icon"
                                    aria-hidden="true"
                                  ></span>
                                  <span className="visually-hidden">Next</span>
                                </button>
                              </div>
                              <div className="mostrar">
                                <div className="row">
                                  <div className="col-4 bg-negro"></div>
                                  <div className="col-4 bg-negro"></div>
                                  <div className="col-4 bg-negro"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-6 mt-5">
                        <div className="row">
                          <div className=" col-md-12 col-xl-6">
                            <div className="card" style={{ width: "18rem" }}>
                              <div className="card-body">
                                <input
                                  type="text"
                                  onChange={change}
                                  placeholder="Nombre"
                                  name="nombre"
                                  className="input-h3"
                                  value={products.nombre}
                                  autoComplete="off"
                                />
                                <input
                                  type="text"
                                  onChange={change}
                                  placeholder="descripcion"
                                  name="descripcion"
                                  className="input-h3 "
                                  value={products.descripcion}
                                  autoComplete="off"
                                />
                                <input
                                  type="text"
                                  onChange={change}
                                  placeholder="costo"
                                  name="costo"
                                  className="input-precio text-success"
                                  value={products.costo}
                                  autoComplete="off"
                                />
                                <input
                                  type="text"
                                  onChange={change}
                                  placeholder="valor producto"
                                  name="valor"
                                  className="input-precio text-success"
                                  value={products.valor}
                                  autoComplete="off"
                                />

                                <input
                                  type="text"
                                  onChange={change}
                                  placeholder="stock"
                                  name="stock"
                                  className="input-precio text-success"
                                  value={products.stock}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      onClick={env}
                      type="button"
                      className="btn btn-primary"
                    >
                      {btnLoad ? (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      ) : (
                        "Insertar"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {data.map((producto) => {
              return (
                <div
                  className="col-6 col-md-4 col-lg-4 col-xl-4 col-xxl-3 "
                  key={producto.codigo_producto}
                >
                  <div
                    className="card mt-4"
                    style={{ border: "none", position: "relative" }}
                  >
                    <Link className="circulo" to={`/productos/${producto.codigo_producto}`}>
                      <i className="center bi bi-pencil"></i>
                    </Link>

                    <span
                      onClick={() => borrar(producto)}
                      style={{ top: "13%" }}
                      className="circulo "
                    >
                      <i className="bi bi-trash"></i>
                    </span>

                    <Suspense
                      fallback={
                        <div className="d-flex justify-content-center">
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      }
                    >
                      <div className=" contenedor ">
                        <Img
                          url={producto.img1}
                          clase={"card-img-top imagen"}
                        />
                      </div>
                    </Suspense>

                    <div className="card-body">
                      <h6>{producto.nombre} </h6>
                      <h6 className="text-muted">{producto.descripcion}</h6>
                      <h6 style={{ color: "blue", textAlign: "center" }}>
                        {formatterPeso.format(producto.valor)}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Productos;
