import React from 'react'
import { useState } from 'react'
import './Style/carrito.css'
import { FaShoppingCart } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItems, addItems } from '../reducers/cartReducer'
import { Link } from 'react-router-dom'


export const Carrito = () => {

    const dispatch = useDispatch();
    const newList = useSelector(state => state.cart);

    const newListMap = newList.map(item => {
        return [item.id, item]
    });

    var newListMapArr = new Map(newListMap); 

    const unicos = [...newListMapArr.values()]; // Esto hay que mandar al back

    const objectFilter = unicos.filter((item) => item.id) // Esto esta para que cuando se envien los productos a la pagina de detalle, no aparezca un objeto con error

    objectFilter.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }       
        return 0;
      }); // Ordena Alfabeticamente el contenido del carrito

    const addStock = (item) => {
        dispatch(deleteItems(item))
        dispatch(addItems({
            ...item, stock: item.stock < item.initialStock ? item.stock +1 : item.stock,
          }))
    }
    
    const lessStock = (item) => {
        dispatch(deleteItems(item))
        dispatch(addItems({
            ...item, stock: item.stock > 0 ? item.stock -1 : dispatch(deleteItems(item)),
          }))
    }    
    
    const prices = objectFilter.map(item => item.price * item.stock);

    const total = prices.reduce((a, b) => a + b, 0);

    return (
        
            <div className='carrito-container d-flex flex-column justify-content-around align-items-center'>
                <div className='carrito-title w-100 h-25 d-flex justify-content-center align-items-center'>
                    <h3 className='d-inline'>carrito</h3> <FaShoppingCart className='mx-2' size={'2.5em'} />
                </div>

                <div className='h-100 overflow-auto'>
                    <div className='d-flex flex-column justify-content-around align-items-center'>

                        {objectFilter.map((item) => (

                            <div className="d-flex justify-content-around align-items-center w-100" key={item.id}>

                                <img className="w-25 h-25 m-1" src={item.image} alt="Card image cap" />

                                <div className='w-75 m-1'>
                                    <div className='d-flex'>

                                        <div className='d-flex justify-content-start align-items-end w-75'>
                                            <p className=''> {item.name} </p>
                                        </div>

                                        <div className='d-flex justify-content-end align-items-start w-25'>
                                            <BsTrash className='m-2' size={"1.8em"} 
                                            onClick={() => dispatch(deleteItems(item))}/>
                                        </div>

                                    </div>

                                    <div className='d-flex m-1 '>
                                        <div className='w-50 d-flex flex-column'>

                                            <div className='d-flex item-quantity_conteiner align-items-center'>
                                                <button className='btn'
                                                    onClick={() => lessStock(item)}
                                                >  -  </button>

                                                <input className='item-quantity_number' type="text"
                                                    value={item.stock === null || item.stock === 0 ? dispatch(deleteItems(item)) : ` ${item.stock} `}
                                                ></input>

                                                <button className='btn'
                                                    onClick={() => addStock(item)}
                                                >  +  </button>
                                            </div>

                                        </div>

                                        <div className='d-flex justify-content-end align-items-end w-50'>
                                            <p>$ {(item.price - ((item.price / 100) * item.descuento)) * item.stock}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        ))}

                    </div>
                </div>

                <div className='carrito-buyData d-flex w-100 flex-column'>
                    <div className='d-flex w-100 justify-content-between'>
                        <p className='mx-2'>Total sin envio:</p>
                        <p className='mx-2'>$ {total}</p>
                    </div>
                    <Link className={`${ objectFilter.length === 0? "d-none" : "" } w-100`} to={"/detallecompra"}
                    onClick={ () => (dispatch(addItems(objectFilter)))}>
                        <button className='w-100 btn btn-outline-dark me-2 text-uppercase m-2'>realizar pedido</button>
                    </Link>
                </div>
            </div>
        
    )
}
