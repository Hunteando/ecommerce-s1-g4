import React from 'react'
import { Link } from 'react-router-dom'
import { bootstrap } from "bootstrap"
import Logo from "../img/logo.png"
import './Style/navbar.css'
import { FaUserAlt } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { BsSearch } from 'react-icons/bs'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeCategory } from '../reducers/categoryReducer'
import { Carrito } from '../components'


export const NavBar = () => {

  const [user, setUser] = useState("");
  const [showCart, setShowCart] = useState(false)

  const dispatch = useDispatch()

  return (
    <>
      <nav className="navbar px-4 navbar-expand-lg text-uppercase " >

        <Link className='main-img' to="/"  >
          <img className='m-1' src={Logo} alt="Logo" width="auto" height="70"></img>
        </Link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse h4 navbar-collapse mt-3 " id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto  mb-lg-0">
            <li className="nav-item dropdown">
              <Link className="nav-link flex-fill  mx-4 dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categorias
              </Link>
              <ul className="dropdown-menu navbar-box">
                <li><Link
                  onClick={() => { dispatch(changeCategory("Hogar")) }}
                  className="dropdown-item px-2" to={"/categorias"}>LINEA HOGAR</Link></li>
                <li><Link
                  onClick={() => { dispatch(changeCategory("Linea Bebe")) }}
                  className="dropdown-item px-2" to={"/categorias"}>LINEA BEBÉ</Link></li> {/*Filtrar*/}
                <li><Link
                  onClick={() => { dispatch(changeCategory("Accesorio")) }}
                  className="dropdown-item px-2" to={"/categorias"}>ACCESORIOS</Link></li>
                <li><Link
                  onClick={() => { dispatch(changeCategory("Todos")) }}
                  className="dropdown-item px-2" to={"/categorias"}>TODOS LOS PRODUCTOS</Link></li>
              </ul>
            </li>
          </ul>

          <form className="d-flex container-fluid p-2" role="text">
            <input className="form-control navbar-search position-absolute mt-1 " type="text" placeholder="Buscar" />
            <button className="btn lupa" type="submit"><BsSearch size={'1.3em'} />{/*Busqueda*/}</button>
          </form>

          <div className='d-flex justify-content-center icon-container'>


            <ul className="navbar-nav me-auto  mb-lg-0">
              <li className="nav-item dropdown">
                <Link className="nav-link flex-fill" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaUserAlt className='btn nav-btn' size={'3.5em'}
                    onClick={() => console.log("usuario")}
                  />{/*Usuario*/}
                </Link>
                <ul className="dropdown-menu navbar-box icon-box">
                  <li><Link className="dropdown-item " to={"/login"}>INICIAR SESIÓN</Link></li> {/*inicio de sesión*/}
                  <li><Link className="dropdown-item " to={"/registro"}>CREAR CUENTA</Link></li>
                </ul>
              </li>

              <li className="nav-item dropdown">

                <Link className="nav-link flex-fill" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaShoppingCart onClick={() => setShowCart(true)} className='btn nav-btn' size={'3.5em'} />
                </Link>

                <ul className={`${showCart ? "" : "d-none"} icon-box`}>

                  <div className='carrito-fondo w-100 h-100'>

                    <li onMouseLeave={() => setShowCart(false)} >

                      <Carrito />

                    </li> {/*carrito*/}

                  </div>
                  
                </ul>

              </li>

            </ul>

          </div>

        </div>

      </nav>
    </>
  )
}

