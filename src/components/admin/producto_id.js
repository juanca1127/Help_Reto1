import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import HelpSpinners from "components/spinners";

import Swal from "sweetalert2";

const ProductoId = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [accion, setAccion] = useState("PUT");

  useEffect(() => {
    const obtenerproducts = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/producto?id=${id}`
      );
      const product = await data.json();

      setProducts(product[0]);
setTimeout(() => {
  setLoading(false);
}, 1050);
     
    };

    obtenerproducts();
  }, [id]);
  const enter = (e) => {
    let bb = e.target;

    let accion = bb.getAttribute("data-name") ? "PUT" : "POST";

    setAccion(accion);
  };
  const change = (e) => {
    const { name, value } = e.target;

    setProducts({ ...products, [name]: value });
    // console.log({ ...products, [name]: value });
  };

  const env = async (e) => {
    let multiple_img = document.getElementById("inputArchivos");
    let formData = new FormData();
    const archivosParaSubir = multiple_img.files;

    for (const archivo of archivosParaSubir) {
      formData.append("img[]", archivo);
    }
    formData.append("accion", accion);
    formData.append("datos", JSON.stringify(products));

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/add_productos`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);

    if (data > 0) {
      Swal.fire({
        title: "",
        icon: "success",
        timer: 2000,
        toast: true,
        position: "top-end",
        width: "10rem",
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        title: `No se realizo cambio`,
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

    for (let i = 0; i < filesArr.length; i++) {
      const { name } = filesArr[i];

      if (i === 0) {
        setProducts({ ...products, imagen: name });
      }

      if (i === 0) {
        document.getElementById("render2").innerHTML = " ";
      }
      let reader = new FileReader();

      reader.readAsDataURL(e.target.files[i]);
      reader.onload = function () {
        // let preview = document.getElementById("render1"),
        //   image = document.createElement("img");
        // image.classList.add("img");
        // image.classList.add("mt-2");
        // image.src = reader.result;

        // preview.append(image);
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

  return (
    <>
      {loading ? (
        <div className="carga">
          <HelpSpinners loading={loading} size={300} />
        </div>
      ) : (
        <>
          <div className="row">
            <div
              id="one"
              style={{ minHeight: "100vh" }}
              className="col-sm-12 col-md-8 mt-5"
            >
              <div className="card card-t">
                <div className="row">
                  <div className="col-3 ">
                    <span
                      onClick={enter}
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
                          style={{ pointerEvents: "none", fontSize: "20px" }}
                          className="bi bi-upload"
                        ></i>
                      </label>
                    </span>
                  </div>
                  <div className="col-md-9 col-sm-12 ">
                    <div
                      id="carouselExampleIndicators"
                      className="carousel slide"
                      data-bs-ride="carousel"
                    >
                      <div id="render2" className="carousel-inner">
                        <div className="carousel-item active">
                          <img
                            src={`${process.env.REACT_APP_SERVER_URL_IMG}/${products.img1}`}
                            className="d-block w-100 img"
                            alt="..."
                          />
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
                        <span className="visually-hidden">Previous</span>
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
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-12 col-md-4 mt-5">
              <input
                type="text"
                onChange={change}
                name="nombre"
                className="input-h3"
                value={products.nombre}
              />

              <input
                type="text"
                onChange={change}
                name="descripcion"
                className="input-h3 text-muted"
                value={products.descripcion}
              />
              <div>
                <label htmlFor="costo"> Costo</label>
                <input
                  id="costo"
                  type="text"
                  onChange={change}
                  name="costo"
                  className="input-precio text-success"
                  value={products.costo}
                  style={{ marginLeft: "10px" }}
                />
              </div>
              <div>
                <label htmlFor="stock"> Stock</label>
                <input
                  id="stock"
                  type="text"
                  onChange={change}
                  name="stock"
                  className="input-precio text-success"
                  value={products.stock}
                  style={{ marginLeft: "10px" }}
                />
              </div>
              <div>
                <label htmlFor="stock"> Stock Minimo</label>
                <input
                  id="stock"
                  type="text"
                  onChange={change}
                  name="stock"
                  className="input-precio text-success"
                  value={products.stock_min}
                  style={{ marginLeft: "10px" }}
                />
              </div>
              <div>
                <label htmlFor="valor"> Valor</label>
                <input
                  id="valor"
                  type="text"
                  onChange={change}
                  name="valor"
                  className="input-precio text-success"
                  value={products.valor}
                  style={{ marginLeft: "10px" }}
                />
              </div>
              <div className="col-12 mt-4">
              <div className="justify-content-end">
                <button onClick={env} type="button" className="btn w-100  btn-primary">
                  Update
                </button>
              </div>
            </div>
            </div>

           
          </div>
        </>
      )}
    </>
  );
};
export default ProductoId;
