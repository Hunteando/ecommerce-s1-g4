import React, { useRef, useEffect } from "react";
import bolso from './../img/fondo 3.png'
import img4 from './../img/Fondo 4.png'
import imgCamion from './../img/Ilustracion Camion.png'
import imgTarjetas from './../img/Ilustracion tarjetas.png'
import imgTienda from './../img/Ilustracion Tienda.png'

// ------- Por si es necesario usar fotos en los botones ------
//import MoveDerecha from './../img/move-rigth.png'
//import MoveIzquierda from './../img/move-left.png'
//-------------------------------------------------------------




import { ReactComponent as FlechaDerecha } from "./../img/flecha-2.svg";
import { ReactComponent as FlechaIzquierda } from "./../img/Flecha-1.svg";

// -------------- Style Components -----------------
import styled from 'styled-components'



export const Slideshow = () => {

    // --------- Funciones de Movilidad ------------
    const carousel = useRef(null);
    const intervaloSlide = useRef(null);

    const siguiente = () => {
        // Comprobando si el slide tiene elementos
        if (carousel.current.children.length > 0) {
            // Obteniendo el primer elemento
            const primerElemento = carousel.current.children[0];

            carousel.current.style.transition = `300ms ease-out all`;

            const tamañoCarousel = carousel.current.children[0].offsetWidth;

            // Movemos el Slide
            carousel.current.style.transform = `translateX(-${tamañoCarousel}px)`;

            const transicion = () => {
                //Reiniamos la posicion del slide
                carousel.current.style.transition = `none`;
                carousel.current.style.transform = `translateX(0)`;

                // Tomamos el primer elemento y lo mandamos al final 
                carousel.current.appendChild(primerElemento);

                // Elimino addEventListener
                carousel.current.removeEventListener('transitionend', transicion);
            }

            //EvenListener para cuando termina la animacion
            carousel.current.addEventListener('transitionend', transicion);



        };
    }
    const anterior = () => {
        // Comprobando si el slide tiene elementos

        if (carousel.current.children.length > 0) {

            // Obteniendo el primer elemento

            const index = carousel.current.children.length - 1;
            const ultimoElemento = carousel.current.children[index];

            carousel.current.insertBefore(ultimoElemento, carousel.current.firstChild)


            carousel.current.style.transition = `none`;
            //----- Tamaño slide
            const tamañoCarousel = carousel.current.children[0].offsetWidth;

            carousel.current.style.transform = `translateX(-${tamañoCarousel}px)`;

            setTimeout(() => {
                carousel.current.style.transition = `300ms ease-out all`;
                carousel.current.style.transform = `translateX(0)`;
            }, 30);
        };
    }
    //---------------------------------------------

    useEffect(() => {

        const timing = setInterval(() => {
            siguiente();
        }, 5000);



    }, []);

    return (
        // ------------- Preguntar a Matias por que con F2 no me deja cambiar el nombre del Componente -------------
        <>

            <ContenedorPrincipal className="main_carousel">
                <ContenedorCarousel ref={carousel}>
                    <Slide>
                        <a href="http://localhost:3000/error404">
                            <img className="img-slide" src={img4} alt="" />
                        </a>
                    </Slide>
                    <Slide>
                        <a href="http://localhost:3000/error404">
                            <img className="img-slide" src={bolso} alt="" />
                        </a>
                    </Slide>
                    <Slide>
                        <a href="http://localhost:3000/error404">
                            <img className="img-slide" src={img4} alt="" />
                        </a>
                    </Slide>
                    <Slide>
                        <a href="http://localhost:3000/error404">
                            <img className="img-slide" src={bolso} alt="" />
                        </a>
                    </Slide>



                </ContenedorCarousel>





                <Controles>
                    <Boton izquierdo className="svg-flecha" onClick={anterior}>
                        <FlechaIzquierda className="Iz" />
                    </Boton>
                    <Boton derecho onClick={siguiente}>
                        <FlechaDerecha className="De" />
                    </Boton>

                </Controles>


            </ContenedorPrincipal>
            <ContenedorIMG className="conteiner-metodos-info">
                <Imagen id="conteiner-pagos">
                    <img className="img-barra_info" id="pagos" src={imgTarjetas} />
                    <p className="imagen-informativa">Debito y Credito</p>
                </Imagen>
                <div className="div-barra">

                </div>
                <Imagen id="conteiner-envios">
                    <img className="img-barra_info" id="envios" src={imgCamion} />
                    <p className="imagen-informativa">Envios a todo el país</p>
                </Imagen>
                <div className="div-barra">

                </div>
                <Imagen id="conteiner-tienda">
                    <img className="img-barra_info" id="tienda" src={imgTienda} />
                    <p className="imagen-informativa">Retiro en tienda</p>
                </Imagen>
            </ContenedorIMG></>


        // ----------------- Debo ubicar el BOTON "COMPRAR AHORA" -----------------------------------
        //<div>
        // <button> <a href="" > COMPRAR AHORA </a> </button>
        //</div>
        //<TextoSlide>
        // <p>Exclusivo <strong> 15% </strong> off  en seleccionados</p>
        //</TextoSlide>
    )
}

const ContenedorPrincipal = styled.div`
    position: relative;

`;
const ContenedorCarousel = styled.div`
    display: flex;
    flex-wrap: nowrap;
`;
const Slide = styled.div`
    min-width: 100%;
    overflow: hidden;
    transition: .5s ease all;
    z-index: 10;
    position: relative;
//------El max-heigth es solo por si las imagenes no son del mismo tamaño ------    
   /* max-heigth: 500px; */
    

    
//----------- imagenes del slide (Se puede cambiar por class name) ------------
    img {
    width: 100%;
    vertical-align: top;
}

`;
// --------------------- TEXTO DEL SLIDE -------------------------------
const TextoSlide = styled.div`
    
    
//-----Optativo-------
    width: 100%;
    //background: rgba(0, 0, 0, 0.1);
    //background: rgba(0, 0, 0, .25);
    //padding: 10% 25% 0% 50%;
   //margin: 10% 0 0 40%;
   // color: #fff;
//--------------------------------   
    color: #6A6A6A;
   
    
    position: absolute;
    text-align: center;
    z-index: 11;
    bottom: 0;
    padding: 0% 0% 20% 35%;

    @media screen and (max-width: 850px){
        position: relative;
    }
//-----------------------PRUEBAS---------------------------------------
//@media screen and (max-width: 700px) {
  //      position: fixed;
   //     padding: 100px 0px 235px;
     //   p, strong{
       //     font-size: 18px;
            
        //}
        //p{
         //   background:rgb(0, 0, 0, .2);
        //}
        
        
    //}
    
    
`;
// ------------------------- BOTONES ----------------------------------
const Controles = styled.div`
    position: absolute;
    top: 0;
    z-index: 20;
    width: 100%;
    height: 90.5%;
    pointer-events: none;

`;

const Boton = styled.button`
    pointer-events: all;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    width: 50px;
    height: 100%;
    text-align: center;
    position: absolute;
    transition: .3s ease all;

//--------- Circulo de flecha --------------
    &:hover svg {
        border-radius: 100%;
        background:  #6A6A6A;
    }
--------------------------------------------
    img{
        width: 50px;
    }

// -------------------- HOVER FLECHAS -------------------------
    
    //&:hover{ 
    //    background: rgba(0, 0, 0, 0.2);
    //    path{
    //        fill: #48484A;
    //    }
    }
    
    //border: #48484A;
    
    path{
        filter: ${props => props.derecho ? 'drop-shadow(-50px 0px 50px #48484A)' : 'drop-shadow(50px 0px 50px #48484A)'} ;
        
    }

    ${props => props.derecho ? 'right: 0' : 'left: 0'}
`;

//------------------------- Barra Nueva ---------------------
const Imagen = styled.div`


width: 33.33%;
justify-content: space-between;
background: #fff;

@media screen and (max-width: 850px) {
    
}


//border-radius: 50px;



`
const ContenedorIMG = styled.div`

display: flex;


`

//export default Slideshow;