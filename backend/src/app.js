// ************ Require's ************
const express = require("express");
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");
const checkoutRouter = require("./routes/chekout");
const dashboardRouter = require("./routes/dashboard");
const categoriesRouter = require("./routes/categories");
const cors = require('cors');
const corsOptions = require('./database/config/corsOptions');
const carritoRouter = require("./routes/compras");



// ************ express() - (don't touch) ************
const app = express();
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ************ Middlewares - (don't touch) ************
app.use(express.static(__dirname + "../public"));
app.use(cors(corsOptions));
app.use(cors({
  origin: ["http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//************Rutas******* **/
/* RUTAS QUE FALTAN */
//niciar Sesión (/login)
//Registro (/registrar)
//Dashboard (/dashboard/cliente)
//Dashboard (/dashboard/admin)
app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/productos", productRouter);
app.use("/compras", carritoRouter);
app.use("/checkout", checkoutRouter);
app.use("/dashboard", dashboardRouter);
app.use("/categorias", categoriesRouter);




//A través del método listen levantamos el servidor. Utilizamos variables de entorno


app.listen(process.env.PORT || "3001", () => {
  console.log("Servidor funcionando ");
})
