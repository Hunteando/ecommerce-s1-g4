const express = require("express");
const carritoController = require("../controllers/carritoController");
const router = express.Router();

/* página del carrito */
router.get('/compras', carritoController.carrito);

/* Agregar Item */
router.get('/agregar:id', carritoController.agregarItem);

/* Quitar item */
router.get('/quitar:id', carritoController.quitarItem);

/* Mostrar carrito */
router.get('/listarcarrito', carritoController.mostrarCarrito)


module.exports = router;
