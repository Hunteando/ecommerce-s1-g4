import React, { useState } from 'react'
import { Form, Formik, Field, ErrorMessage } from 'formik'
import '../Style/detalleCompra.css'
import * as Yup from 'yup'
import truc from '../../img/entrega.png'
import tent from '../../img/tent.png'
import otrosMedios from '../../img/otrosMedios.png'
import mercadoPago from '../../img/mercadoPago.png'
import { BsGeoAltFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

export const DetalleCompra = () => {

    const [showClient, setShowClient ] = useState(true);
    const [showSend, setShowSend ] = useState();
    const [showPay, setShowPay ] = useState();
    const [send, setSend] = useState(true);
    const [paid, setPaid] = useState(true);

    const [sendUser, setSendUser] = useState({})
    const [sendAdress, setSendAdress] = useState({adress: "retira en local"})
    const [totalData, setTotalData ] = useState({})

    const [sendCost, setSendCost] = useState(0)

    const getList = useSelector(state => state.cart);

    const filterList = getList.filter( (item) => !item.id )

    const showItems = filterList[filterList.length - 1]   

    const prices = filterList[filterList.length - 1].map(item => item.price * item.stock);

    const total = prices.reduce((a, b) => a + b, 0);

    const validation = Yup.object().shape({     
        firstName: Yup.string()
        .required("campo requerido")
        .min(3, "El nombre debe ser mayor de 2 letras")
        .max(50, "el campo no puede superar los 50 caracteres")
        .matches(/^[aA-zZ]+$/, "Ingrese solo letras"),
        lastName:  Yup.string()
        .required("campo requerido")
        .min(3, "El apellido debe ser mayor de 2 letras")
        .max(50, "el campo no puede superar los 50 caracteres")
        .matches(/^[aA-zZ]+$/, "Ingrese solo letras"),
        address_mail:  Yup.string()
        .email("Introdusca un mail valido")
        .required("campo requerido")
        .max(50, "el campo no puede superar los 50 caracteres"),
        dni:  Yup.number()
        .typeError("ingrese números")
        .required("campo requerido")
        .positive("el numero no puede ser negativo"),
        phone_number:  Yup.number()
        .typeError("ingrese números")
        .required("campo requerido")
        .positive("el numero no puede ser negativo"),
    })

    const validation2 = Yup.object().shape({
      postalCode: Yup.number()
      .typeError("ingrese números")
      .required("campo requerido")
      .positive("el numero no puede ser negativo"),
      city: Yup.string()
      .min(2, "Ingrese mas de 2 caracteres")
      .required("campo requerido"),
      state: Yup.string()
      .min(2, "Ingrese mas de 2 caracteres")
      .required("campo requerido"),
      streat: Yup.string()
      .min(2, "Ingrese mas de 2 caracteres")
      .required("campo requerido"),
      number: Yup.string()
      .min(2, "Ingrese mas de 2 caracteres")
      .required("campo requerido"),
      dept: Yup.string()
      .min(2, "Ingrese mas de 2 caracteres")
      .required("campo requerido"),
    })

  return (
    <div
         
        className='w-100 d-flex justify-content-center align-items-start'>
        <div className='w-50 d-flex flex-column justify-content-center align-items-center'>
            <div className='m-2 pt-2 detalle-data_container'>
                <h3 onClick={() => setShowClient(!showClient)}>
                  <button className='detalle-number p-1'>1</button>IDENTIFICACION</h3>
                <div className={`${showClient? "" : "d-none"}`}> 
                <Formik 
                  initialValues={{
                    firstName: '',
                    lastName: '',
                    address_mail: '',
                    dni: '',
                    phone_number: '',
                  }}
                  validationSchema= {validation}
                  onSubmit={async (values) => {
                    setSendUser(values);
                    setShowClient()
                    setShowSend(true)
                  }}
                >
                  {({ touched, errors }) => (
                  <Form className='d-flex flex-column justify-content-center m-3 '>

                    <label htmlFor="sell-address_mail">Email</label>
                    <Field                       
                        id="sell-address_mail"
                        name="address_mail"
                        placeholder="Ingrese su Email"
                        type="address_mail"
                        className={`w-100 px-2 detalle-data_field
                        ${touched.address_mail && errors.address_mail ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="address_mail"
                        className="invalid-feedback"
                      />

                    <label htmlFor="sell-firstName">Nombre</label>
                    <Field 
                        id="sell-firstName" 
                        name="firstName" 
                        placeholder="Ingrese su Nombre" 
                        className={`w-100 px-2 detalle-data_field
                        ${touched.firstName && errors.firstName ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="firstName"
                        className="invalid-feedback"
                      />
              
                    <label htmlFor="sell-lastName">Apellido</label>
                    <Field 
                        id="sell-lastName" 
                        name="lastName" 
                        placeholder="Ingrese su Apellido" 
                        className={`w-100 px-2 detalle-data_field
                        ${touched.lastName && errors.lastName ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="lastName"
                        className="invalid-feedback"
                      />

                    <label htmlFor="sell-phone_number">Teléfono</label>
                    <Field
                        id="sell-phone_number"
                        name="phone_number"
                        placeholder="Ingrese su Telefono"
                        type="text"
                        className={`w-100 px-2 detalle-data_field
                        ${touched.phone_number && errors.phone_number ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="phone_number"
                        className="invalid-feedback"
                      />
                    <label htmlFor="sell-dni">DNI</label>
                    <Field
                        id="sell-dni"
                        name="dni"
                        placeholder="Ingrese su DNI"
                        type="text"
                        className={`w-100 px-2 detalle-data_field
                        ${touched.dni && errors.dni ? "is-invalid" : ""}`}
                      />

                      <ErrorMessage
                        component="div"
                        name="dni"
                        className="invalid-feedback"
                      />
              
                    <button className='my-2 btn align-self-end btn-submit' type="submit">Pasar al envio</button>
                  </Form>)}
                </Formik>               
                
                </div>
            </div>
            <div className='m-2 pt-2 detalle-data_container'>
                <h3 onClick={() => setShowSend(!showSend)}> 
                <button className='detalle-number p-1'>2</button>ENVIO</h3>
                <div className={`${showSend? "" : "d-none"} d-flex w-100 justify-content-center`}> 
                
                    <div className='d-flex w-100 h-100 flex-column justify-content-center align-items-center   '>
                      <button onClick={() => setSend(true)}
                      className={`btn btn-sending d-flex justify-content-center m-2 align-items-center
                      ${send? `selected`: ""} 
                      `}> 
                      <img className='mx-4' src={truc}></img>
                      enviar a domicilio
                      </button>
                      <button onClick={() => setSend()}
                      className={`btn btn-sending d-flex justify-content-center m-2 align-items-center
                      ${!send? `selected`: ""} 
                      `}> 
                      <img className='mx-4' src={tent}></img>
                      retirar en tienda
                      </button>

                      <div className={`${!send? "d-none" : ""} m-2 pt-2 detalle-data_send`}>
                       <Formik
                          initialValues={{
                            postalCode: '',
                            city: '',
                            state: '',
                            streat: '',
                            number: '',
                            dept: '',
                          }}
                          validationSchema= {validation2}
                          onSubmit={async (values) => {
                            setSendAdress(values);
                            setShowSend()
                            setShowPay(true)
                          }}

                        >
                          {({ touched, errors }) => (
                          <Form className='d-flex flex-column justify-content-center m-3 '>
                          
                            <label htmlFor="sell-postalCode">Codigo Postal</label>
                            <Field                       
                                id="sell-postalCode"
                                name="postalCode"
                                placeholder="Ingrese su Codigo Postal"
                                type="postalCode"
                                className={`w-100 px-2 detalle-data_field
                                ${touched.postalCode && errors.postalCode ? "is-invalid" : ""}`}
                              />

                              <ErrorMessage
                                component="div"
                                name="postalCode"
                                className="invalid-feedback"
                              />

                            <label htmlFor="sell-city">Ciudad</label>
                            <Field                       
                                id="sell-city"
                                name="city"
                                placeholder="Ingrese su Ciudad"
                                type="city"
                                className={`w-100 px-2 detalle-data_field
                                ${touched.city && errors.city ? "is-invalid" : ""}`}
                              />

                              <ErrorMessage
                                component="div"
                                name="city"
                                className="invalid-feedback"
                              />

                            <label htmlFor="sell-state">Provincia</label>
                            <Field                       
                                id="sell-state"
                                name="state"
                                placeholder="Ingrese su Provincia"
                                type="state"
                                className={`w-100 px-2 detalle-data_field
                                ${touched.state && errors.state ? "is-invalid" : ""}`}
                              />

                              <ErrorMessage
                                component="div"
                                name="state"
                                className="invalid-feedback"
                              />

                            <label htmlFor="sell-streat">Domicilio</label>
                            <Field                       
                                id="sell-streat"
                                name="streat"
                                placeholder="Ingrese su Domicilio"
                                type="streat"
                                className={`w-100 px-2 detalle-data_field
                                ${touched.streat && errors.streat ? "is-invalid" : ""}`}
                              />

                              <ErrorMessage
                                component="div"
                                name="streat"
                                className="invalid-feedback"
                              />

                            <div className='d-flex'>

                              <div className='mr-2'>
                              <label htmlFor="sell-number">Altura</label>
                              <Field                       
                                  id="sell-number"
                                  name="number"
                                  placeholder="Ingrese la Altura"
                                  type="number"
                                  className={`w-100 px-2 detalle-data_field
                                  ${touched.number && errors.number ? "is-invalid" : ""}`}
                                />

                                <ErrorMessage
                                  component="div"
                                  name="number"
                                  className="invalid-feedback"
                                />  
                              </div>

                              <div>
                              <label htmlFor="sell-dept">Departamento</label>
                              <Field                       
                                  id="sell-dept"
                                  name="dept"
                                  placeholder="Ingrese su Departamento"
                                  type="dept"
                                  className={`w-100 px-2 detalle-data_field
                                  ${touched.dept && errors.dept ? "is-invalid" : ""}`}
                                />
  
                                <ErrorMessage
                                  component="div"
                                  name="dept"
                                  className="invalid-feedback"
                                />
                              </div>

                            </div>
                            <button className='my-2 btn align-self-end btn-submit' type="submit">Pasar al Pago</button>
                          </Form>)}
                        </Formik>     
                        
                      </div>

                      <div className={`${send? "d-none" : ""} d-flex flex-column w-100 justify-content-center align-items-center`}>

                        <div className='m-2 pt-2 detalle-data_container d-flex'>
                            <BsGeoAltFill className='m-4 w-25' color='#BFE393' size={"6rem"}/>
                            <div className='d-flex flex-column w-75 justify-content-around h-100'>
                              <h4>Retirar En Tienda</h4>

                              <div className='d-flex flex-column justify-content-center'>
                                <span>123142 Lomas Estes</span>
                                <span>Buenos Aires</span>
                              </div>

                              <p className='viewMap align-self-end mx-4'>Ver En El Mapa</p>
                            </div>
                            
                        </div>

                        <div className='d-flex justify-content-end size-90'>      
                          <button onClick={()=> (console.log("retira en tienda"), setShowSend(), setShowPay(true))}
                          className='mb-2 px-4 btn align-self-end btn-submit'>Pasar al Pago</button>
                        </div>
                        
                      </div>

                    </div>

              
                </div>
            </div>
            <div className='m-2 pt-2 detalle-data_container'>
                <h3 onClick={() => setShowPay(!showPay)}> 
                <button className='detalle-number p-1'>3</button>PAGO</h3>
                <div className={`${showPay? "" : "d-none"} d-flex flex-column justify-content-center align-items-center`}> 
                
              
                <button onClick={() =>  setTotalData({
                        user: sendUser,
                        adress: sendAdress,
                        products: showItems,
                      })}     // estos son los items que el back necesita. 
                      className={`btn size-90 btn-sending d-flex justify-content-start m-2 align-items-center 
                      ${paid? `selected`: ""}`}> 
                      <img className='mx-4' src={mercadoPago}></img>
                </button>

                <button onClick={() => (
                     console.log(totalData) // cambiar para enviar al back.
                )}
                      className={`btn mb-4 size-90 btn-sending d-flex justify-content-start m-2 align-items-center 
                      ${!paid? `selected`: ""}`}> 
                      <img className='mx-4' src={otrosMedios}></img>
                </button>
      
                
                </div>
            </div>
        </div>

        <div className='w-50 d-flex'>
          <div className='m-2 pt-2 detalle-data_container'>
            <h3 className='mx-3'>RESUMEN DE COMPRA</h3>
            
            {showItems.map((item)=> (
              <div className='mx-3 d-flex justify-content-between align-items-center' key={item.id}>

                <img className='w-25' src={item.image}></img>

                <p className='w-50 item-text'> {item.name} x{item.stock}</p>
                
                <p className='item-text'> $ {(item.price*item.stock)}</p>                             

              </div>
              ))}

            <div className='m-2 container-totalcost'>
              <div className='mt-2 d-flex justify-content-between'>
                <p className='mx-2 subtotal-font'>Sub Total:</p>
                <p className='mx-2 subtotal-font'>$ {total}</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='mx-2 subtotal-font'>Costo de Envio:</p>
                <p className='mx-2 subtotal-font'> {sendCost} </p>
              </div>
              <div className='pt-2 d-flex justify-content-between total-border'>
                <p className='mx-2 total-font'>Total:</p>
                <p className='mx-2 total-font'>$ {total + sendCost}</p>
              </div>
            </div>

          </div>
        </div>
    </div>
  )
}
