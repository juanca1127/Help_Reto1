import React, { useState } from "react";
import Login from "components/logins/login";
import Menu from "components/menu";
import Pagos from "checkaut/pagos";
import Admin from "./components/admin/";
import Registro from "./components/logins/registro";


import { BrowserRouter, Routes, Route } from "react-router-dom";

const Rutas = () => {
  const [isLogin, setIslogin] = useState(
    localStorage.getItem("User") ? false : false
  );

  const [Isadmin, setIsadmin] = useState(
    localStorage.getItem("IsAdmin") ? true : false
  );

  return (
    <>
   
        <BrowserRouter>
          <Routes>
            {Isadmin ? (
              <>
                <Route
                  path="*"
                  element={<Admin Isadmin={Isadmin} setIsadmin={setIsadmin} />}
                />
              </>
            ) : (
              <>
                <Route
                  exact
                  path="/registro"
                  element={<Registro Isadmin={Isadmin}  isLogin={isLogin} />}
                />
                <Route
                  exact
                  path="/login"
                  element={
                    <Login
                      setIsadmin={setIsadmin}
                      isLogin={isLogin}
                      setIslogin={setIslogin}
                    />
                  }
                />

                
                <Route exact path="/pagos/:id" element={<Pagos />} />
                <Route
                  path="*"
                  element={
                    <>
                      <Menu />
                    </>
                  }
                />
              </>
            )}
          </Routes>
        </BrowserRouter>
  
    </>
  );
};
export default Rutas;
