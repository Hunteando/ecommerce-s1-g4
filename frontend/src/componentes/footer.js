import React, { useState } from "react";
import logo from './../img/logo 117.png'
import logoInstagram from './../img/Icono instagram normal.png'
import ubicacion from './../img/ubi.png'
import datarandom from './../img/datafiscal.png'
import { Formik } from "formik";

const Footer = () => {
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false)
    return (
        <div>

            <footer className="footer1">
                <div className="grid-containter">

                    <div className="part-one">
                        <div className="texto-primer-columna">
                            <h2>Preguntas Frecuentes</h2>
                            <ol>
                            <li>Quienes Somos?</li>
                            <li>Cuales son los medios de pago?</li>
                            <li>Como realizar mi pedido?</li>
                            </ol>
                        </div>
                        <div>
                            <img className="data-random" src={datarandom} />
                        </div>
                    </div>

                    <div className="part-two">
                        <h2>Nuestra Tienda</h2>
                        <p><img className="ubi-tienda" src={ubicacion} />Lorem Ipsum</p>
                        <div>

                        </div>
                    </div>

                    <div className="part-three">
                        <h2>CONTACTO</h2>
                        <div>
                            <Formik
                                initialValues={{
                                    nombre: '',
                                    email: '',
                                    comentario: '',

                                }}
                                // ----------- Validacion y mensaje de error -------------
                                validate={(valores) => {
                                    let errores = {};


                                    //--------- Validacion Nombre -----------
                                    if (!valores.nombre) {
                                        errores.nombre = "Por favor, ingresa tu nombre"
                                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
                                        errores.nombre = 'El nombre solo puede contener letras y espacios'
                                    }

                                    //---------- Validacion Correo ------------
                                    if (!valores.email) {
                                        errores.email = "Por favor, ingresa un correo electronico"
                                    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)) {
                                        errores.email = 'El correo electronico solo puede contener letras, numeros, puntos y guoines'
                                    }

                                    //---------- Validacion Text Area ----------
                                    if (!valores.comentario) {
                                        errores.comentario = "Por favor, deje su consulta"
                                    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.comentario)) {
                                        errores.comentario = 'El comentario solo puede contener letras y espacios'
                                    }
                                    return errores;
                                }}
                                //-------------- Mensaje exitoso de formulario enviado --------------
                                onSubmit={(valores, { resetForm }) => {
                                    resetForm();
                                    console.log("Formulario Enviado")
                                    cambiarFormularioEnviado(true);
                                    setTimeout(() => {
                                        cambiarFormularioEnviado(false)
                                    }, 5000)
                                }}

                            >


                                {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                                    <form target="_blank" action="https://formsubmit.co/lautarolarrue@gmail.com" method="POST"  className="formulario" >
                                        <div>

                                            <input className="nombre"
                                                type="text"
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Nombre"
                                                value={values.nombre}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>}
                                        </div>



                                        <div>

                                            <input className="email"
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.email && errors.email && <div className="error">{errors.email}</div>}
                                        </div>




                                        <div>
                                            <textarea className="textarea"

                                                type="textarea"
                                                id="comentario"
                                                name="comentario"
                                                placeholder="Comentario"
                                                value={values.comentario}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {touched.comentario && errors.comentario && <div className="error">{errors.comentario}</div>}
                                        </div>


                                        <button type="submit" className="btn-envio"> Enviar </button>
                                        {formularioEnviado && <p className="exito">Formulario enviado con exito!</p>}
                                        
                                        <input  type="hidden" name="_captcha" value="false"></input>
                                    </form>
                                )}


                            </Formik>
                        </div>
                    </div>












                    <div className="part-four">
                        <h2>Seguinos</h2>
                        <a href="https://www.instagram.com/lautarolmds27/" >
                            <img className="insta-logo" src={logoInstagram} />
                        </a>
                        <div>
                            <img className="logo-footer" src={logo} />
                        </div>
                    </div>
                </div>
            </footer>

        </div>

    )
}

export default Footer;