import React, { useState } from "react";
import { Formik } from "formik";

const Formulario = () => {
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false)
    return (
        <>

            <Formik
                initialValues={{
                    nombre: '',
                    email: '',

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
                    <form htmlFor="nombre" className="formulario" onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder="Herny Cavill"
                                value={values.nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.nombre && errors.nombre && <div className="error">{errors.nombre}</div>}
                        </div>



                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="HernyCavill@gmail.com"
                                value={values.email}
                                onChange={handleChange}
                            />
                            {touched.nombre && errors.email && <div className="error">{errors.email}</div>}
                        </div>


                        <button type="submit"> Enviar </button>
                        {formularioEnviado && <p className="exito">Formulario enviado con exito!</p>}

                    </form>
                )}


            </Formik>







        </>
    );
}


export default Formulario;