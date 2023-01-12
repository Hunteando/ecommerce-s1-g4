import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";
import Spinner from "../Spinner";

import { register, reset } from "../../reducers/auth/authSlice";


export const Registro = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (e.target.contraseña.value !== e.target.Repetircontraseña.value) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        firstname: e.target.nombre.value,
        lastname: e.target.apellido.value,
        address_mail: e.target.email.value,
        password: e.target.contraseña.value,
        google_id: "kgjldfk",
        rol_user: "cliente",
        photo_perfil: "dfljskjd",
        phone_number: "54s6d4f",
      };

      dispatch(register(userData));
    }
    console.log("Ejecutamos todos");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="main">
      <div>
        <div>
          <Formik
            initialValues={{
              nombre: "",
              email: "",
              apellido: "",
              contraseña: "",
              Repetircontraseña: "",
            }}
            // ----------- Validacion y mensaje de error -------------
            validate={(valores) => {
              let errores = {};

              //--------- Validacion Nombre -----------
              if (!valores.nombre) {
                errores.nombre = "Por favor, ingresa tu nombre";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
                errores.nombre =
                  "El nombre solo puede contener letras y espacios";
              }

              //--------- Validacion Apellido -----------
              if (!valores.apellido) {
                errores.apellido = "Por favor, ingresa tu apellido";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido)) {
                errores.apellido =
                  "El apellido solo puede contener letras y espacios";
              }

              //---------- Validacion Correo ------------
              if (!valores.email) {
                errores.email = "Por favor, ingresa un correo electronico";
              } else if (
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  valores.email
                )
              ) {
                errores.email =
                  "El correo electronico solo puede contener letras, numeros, puntos y guoines";
              }
              //--------- Validacion Apellido -----------
              if (!valores.contraseña) {
                errores.contraseña = "Por favor, ingresa una contraseña";
              } else if (
                /^(?=.\d)(?=.[a-z])(?=.[A-Z]).$/.test(valores.contraseña)
              ) {
                errores.contraseña =
                  "La contraseña debe tener al menos más de 8 caracteres y uno de estos debe ser una mayúscula";
              }

              return errores;
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <form
                id="formulario_data"
                className="formulario"
                onSubmit={onSubmit}
              >

                
                <div className="form_completo">
                <div className="form_N">
                <div>
                  <h1>CREAR CUENTA</h1>
                  <label> Nombre </label> <br></br>
                  <input
                    className="prueba"
                    type="text"
                    id="nombre"
                    name="nombre"
                    
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.nombre && errors.nombre && (
                    <div className="error">{errors.nombre}</div>
                  )}
                </div>

                <div>
                  <label> Apellido </label> <br></br>
                  <input
                    className="prueba"
                    type="text"
                    id="apellido"
                    name="apellido"
                    
                    value={values.apellido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.apellido && errors.apellido && (
                    <div className="error">{errors.apellido}</div>
                  )}
                </div>
                    
                <div>
                  <label> Email </label> <br></br>
                  <input
                    className="prueba"
                    type="email"
                    id="email"
                    name="email"
                    
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <div className="error">{errors.email}</div>
                  )}
                </div>

                <div>
                  <label> Contraseña </label> <br />
                  <input
                    className="prueba"
                    type="password"
                    id="contraseña"
                    name="contraseña"
                  
                    value={values.contraseña}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.contraseña && errors.apellido && (
                    <div className="error">{errors.contraseña}</div>
                  )}
                </div>

                <div>
                  <label> Repetir Contraseña</label> <br />
                  <input
                    className="prueba"
                    type="password"
                    id="Repetircontraseña"
                    name="Repetircontraseña"
                    
                    value={values.Repetircontraseña}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.Repetircontraseña && errors.apellido && (
                    <div className="error">{errors.Repetircontraseña}</div>
                  )}
                </div>

                <button type="submit" className="btn-Registro">
                  CREAR CUENTA
                </button>
                </div>
                </div>
                <p>
                  ¿Ya tenes una cuenta? <b>Inicia Sesión</b>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};
