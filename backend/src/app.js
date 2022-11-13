// ************ Require's ************
const express = require("express");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");
const comprasRouter = require("./routes/compras");
const checkoutRouter = require("./routes/chekout");
const dashboardRouter = require("./routes/dashboard");
const categoriesRouter = require("./routes/categories");



// ************ express() - (don't touch) ************
const app = express();
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ************ Middlewares - (don't touch) ************
app.use(express.static(__dirname + "../public"));

//************Rutas******* **/
/* RUTAS QUE FALTAN */
//Carrito de compras (/compras)
//niciar Sesión (/login)
//Registro (/registrar)
//Dashboard (/dashboard/cliente)
//Dashboard (/dashboard/admin)
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/productos", productRouter);
app.use("/compras", comprasRouter);
app.use("/checkout", checkoutRouter);
app.use("/dashboard", dashboardRouter);
app.use("/categorias", categoriesRouter);



//A través del método listen levantamos el servidor. Utilizamos variables de entorno


app.listen(3001, () => {
  console.log("Servidor funcionando ");
})
