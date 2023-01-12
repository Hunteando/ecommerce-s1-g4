import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'  
import { NavBar, WhatsAppPopUp, Footer } from "./components/";
import { Categorias, Login, Main, Producto, Registro, PagError, RecuperarContraseña, DetalleCompra, DashboardAdmin } from "./components/Pages";

export const App = () => {
  return (
    <div>     
        <Router>
        <NavBar/>        
        <WhatsAppPopUp />
          <Routes>
            <Route path="/" exact element={<Main/>}></Route>
            <Route path="/categorias" element={<Categorias/>}></Route>
            <Route path="/producto" element={<Producto/>}></Route>
            <Route path="/registro" element={<Registro/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/recuperarcontrasena" element={<RecuperarContraseña/>}></Route>
            <Route path="/detallecompra" element={<DetalleCompra/>}></Route>
            <Route path="/dashboardadmin" element={<DashboardAdmin/>}></Route>
            <Route path="*" element={<PagError/>}></Route>
          </Routes>
          <Footer />
        </Router>  
      
    </div>
  );
};




