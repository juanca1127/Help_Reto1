import React from "react";
import Cart from "components/cart";
import bolsa_vacia from "assets/icons/iconoHelpeers.png";
import "animate.css";

function Canvas({ cart, setCart }) {
  // const [cesta, setCesta] = useState(undefined);
  // useEffect(() => {

  //   document.getElementById("offcanvasRight").classList.contains("show")
  //     ? setCesta(true)
  //     : setCesta(false);
  // }, []);

  return (
    <div
      className={`offcanvas offcanvas-end`}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header">
        <h4 id="offcanvasRightLabel">Cesta</h4>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {cart.length === 0 ? (
          <div className="container">
            <div className=" row mt-5">
              <div className="d-flex col-12 justify-content-center ">
                <img
                  width="200px"
                  className={`animate__infinite animate__animated animate__wobble`}
                  src={bolsa_vacia}
                  alt=".."
                />
              </div>
              <div className="d-flex col-12 justify-content-center">
                <h2> Cesta Vacia</h2>
              </div>
            </div>
          </div>
        ) : (
          <Cart cart={cart} setCart={setCart} />
        )}
      </div>
    </div>
  );
}

export default Canvas;
