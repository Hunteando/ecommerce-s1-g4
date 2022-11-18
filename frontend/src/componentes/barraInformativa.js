import React from "react";
import imgCamion from './../img/Ilustracion Camion.png'
import imgTarjetas from './../img/Ilustracion tarjetas.png'
import imgTienda from './../img/Ilustracion Tienda.png'

// -------------- Style Components -----------------
import styled from 'styled-components'

const barraInformativa = () => {
    return (
        <ContenedorIMG>
            <Imagen>
                <img src={imgTarjetas} />
            </Imagen>

            <Imagen>
                <img src={imgCamion} />
            </Imagen>

            <Imagen>
                <img src={imgTienda} />
                <p className="imagen-informativa">Retiro en tienda</p>
            </Imagen>
        </ContenedorIMG>
    );
}


const Imagen = styled.div`
    
`
const ContenedorIMG = styled.div`
background: #fff;
`
















export default barraInformativa;