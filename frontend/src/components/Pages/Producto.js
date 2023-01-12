import React, { useState } from 'react'
import '../Style/producto.css'
import { useSelector, useDispatch } from 'react-redux'
import { addItems } from '../../reducers/cartReducer'


export const Producto = () => {

  const [quantity, setQuantity] = useState(1)
  

  const getProduct = useSelector(state => state.product);
  const showProduct = getProduct[0];
  console.log(showProduct)
  const dispatch = useDispatch()
  const [image, setImage] = useState(showProduct.image)
  const discount = showProduct.descuento === null ? 0 : showProduct.descuento 
  
  
  return (
    <div>
      <div className='w-100 h-100 d-flex product-container'>

        <div className='d-flex flex-column justify-content-center h-100 product-imgs'>

            <div className='product-img d-flex flex-column justify-content-center align-items-center w-100'>
              <img className='w-50 h-50 p-1' src={image}></img>
            </div>

            <div className='d-flex w-100 justify-content-center'> 
              <img className={`product-img w-25 h-25 m-2 p-2 
              ${image === showProduct.image? "product-img_selected" : ""}`}
              onClick={() => setImage(showProduct.image)}
              src={showProduct.image}></img> 
              <img className={`product-img w-25 h-25 m-2 p-2 
              ${image === showProduct.imageA? "product-img_selected" : ""}
              ${showProduct.imageA? "" : "d-none"}`}
              onClick={() => setImage(showProduct.imageA)} src={showProduct.imageA}></img>
              <img className={`product-img w-25 h-25 m-2 p-2 
              ${image === showProduct.imageB? "product-img_selected" : ""}
              ${showProduct.imageB? "" : "d-none"}`}
              onClick={() => setImage(showProduct.imageB)} src={showProduct.imageB}></img>
              <img className={`product-img w-25 h-25 m-2 p-2 
              ${image === showProduct.imageC? "product-img_selected" : ""}
              ${showProduct.imageC? "" : "d-none"}`}
              onClick={() => setImage(showProduct.imageC)} src={showProduct.imageC}></img>
            </div>
          
        </div>


        <div className=' h-100 d-flex flex-column justify-content-around align-items-start product-desc '>
          <div className='d-flex'>
            <h4 className='text-uppercase'> {showProduct.name} </h4>
            <p className={`product-tittle_discount px-1 mx-4 ${discount == 0 ? "d-none" : "" }`}> - {discount} %</p>
          </div>
                
          <div className='d-flex'>
            <h5 className='product-price '>${showProduct.price - ((showProduct.price / 100) * discount)}</h5>
            <h5 className={`product-discount text-inline mx-3 ${discount == 0 ? "d-none" : "" }`}>${showProduct.price}</h5>
          </div>

          <p className="m-1">{showProduct.description}</p>

          <div className='w-50 d-flex flex-column'>
            <h5 className='product-quantity_tittle text-capitalize'>cantidad</h5>

            <div className='d-flex product-quantity_conteiner'>
              <button className='btn'
              onClick={()=> quantity!== 0? setQuantity(quantity - 1): quantity }
              >-</button>                           

              <input className='product-quantity_number' type="text" 
              value={ showProduct.stock === null ? "S/S" : quantity} 
              disabled></input>

              <button className='btn'
              onClick={()=> quantity < showProduct.stock? setQuantity(quantity + 1) : quantity }
              >+</button>
            </div>                        
          </div>
          <p className={`w-100 m-1 text-capitalize product-ss ${showProduct.stock === null ? "" : "d-none" } `} >producto sin stock disponible, consulte por whatsapp para su encargo</p>
          
          <button 
          onClick={() => dispatch(addItems({
            id: showProduct.id,
            name: showProduct.name,
            initialStock: showProduct.stock,
            stock: quantity,
            price: showProduct.price,
            descuento: showProduct.descuento != null ? showProduct.descuento : 0,
            image: showProduct.image,
            imageA: showProduct.imageA != null ? showProduct.imageA : null,
            imageB: showProduct.imageB != null ? showProduct.imageB : null,
            imageC: showProduct.imageC != null ? showProduct.imageC : null,            
          })) }
          className={`${showProduct.stock === null || quantity === 0 ? "d-none" : "" } btn-outline-dark w-100 w-50 text-uppercase rounded my-2 py-2 `}>
            agrega al carrito</button>
        </div>        
      </div>
    </div>
  )
}
