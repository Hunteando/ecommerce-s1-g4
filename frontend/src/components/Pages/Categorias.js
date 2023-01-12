import React, { useState, useEffect } from 'react'
import { Cards } from '../'
import { Loading } from "../"
import '../Style/categorias.css'
import '../Style/MainCard.css'
import { useSelector, useDispatch } from 'react-redux'
import { changeCategory } from '../../reducers/categoryReducer'

export const Categorias = () => {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(products);
  const [loading, setLoading ] = useState(false);
  const [firstLoad, setFirstLoad ] = useState(false)
  

  const categoryState = useSelector(state => state.change);
  const thisCategory = categoryState[0];

  const [selected, setSelected ] = useState(thisCategory);

  const dispatch = useDispatch();


  let componentMounted = true;
  const showSelected = "category-selected"

  const URL = "http://localhost:3001/";

useEffect(() => {

  const getProduct = async () => {    
    setLoading(true);
    const response = await fetch(URL+"productos");
    const jsonClone = await response.clone().json();
    const jsonData = await response.json()
    
    if(componentMounted){
      setProducts(jsonClone.data);
      setFilter(jsonData.data);
      setLoading(false);         
    }
    
    return () => {
      componentMounted = false;
    }

  }
    getProduct();
   
        
},[]);

const filterProduct = async (newCat) => {
  const updatedList = products.filter((product)=> product.category.nameCategory == newCat);
  setFilter(updatedList)
}

const changeView = (newCat) => {
  dispatch(changeCategory(newCat))
  newCat === "Todos" ? 
  (setFilter(products), setSelected("Todos")) : 
  filterProduct(newCat).then(setSelected(newCat)); 
}

const firstLoading = ( showSelectedCat ) => {
  changeView( showSelectedCat ); 
  setFirstLoad(true);
}

const ShowProducts = () => {
 
  return(
          
      <div className='d-flex w-100 flex-column justify-content-center aling-items-center'>
        
      <div className='buttons d-flex justify-content-around my-3 flex-wrap'>
        
        <button className={`${selected === "Hogar"? showSelected : ""} btn btn-outline-dark me-2 text-uppercase m-2`} 
          onClick={() => {changeView("Hogar")}}       
          >Linea Hogar</button>
        
        <button className={`${selected === "Linea Bebe"? showSelected : ""} btn btn-outline-dark me-2 text-uppercase m-2`} 
          onClick={() => {changeView("Linea Bebe")}}
          >Linea Bebe</button> 

        <button className={`${selected === "Accesorio"? showSelected : ""} btn btn-outline-dark me-2 text-uppercase m-2`} 
          onClick={() => {changeView("Accesorio")}}
          >Accesorios</button>

        <button className={`${selected === "Todos" ? showSelected : ""} btn btn-outline-dark me-2 text-uppercase m-2`} 
          onClick={() => {changeView("Todos")}}
          >Todos los Productos</button>
      </div>
      
        <div className='flex-wrap d-flex justify-content-center align-items-center my-3 mx-1' >
          <Cards products={filter} />
        </div>
      </div>
    
  );
};

  return (
    <> 
      <div onMouseMove={()=> thisCategory !== selected? changeView(thisCategory) : "" }
      onLoad={() => !firstLoad ? firstLoading(thisCategory) : setFirstLoad(true)}
      className='d-flex-colums align-items-center '>
        
        <h2 className='category-tittle d-block text-center text-uppercase py-2'>Categorias</h2>
                  
          <div className='d-flex mt-3 justify-content-center aling-items-center flex-wrap'>
            
            { loading ? <Loading/> : <ShowProducts/> }
          
          </div>        
      
      </div>
    </>
  )
}
