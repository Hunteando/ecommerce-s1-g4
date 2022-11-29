const db = require("../database/models");


const carritoController = {

    carrito: (req, res) => {
        db.Products
        .findAll({
         include: [{ association: "category"}]  
        }).then((products) => {
          if (products){
            //inicializamos el carrito , si es que no existe le ponemos un arreglo vacio
            if(req.session.carrito == undefined) {
              req.session.carrito = [];
            }
    }
    })},

    agregarItem(req,res) {
        //Agregamos el producto o si ya está y se clickea se aumenta en cantidad
        let carrito = req.session.carrito;
        let externalId = req.params.id;//lo identificamos
        db.Products.findOne({where: {externalId: id}, include: [{ association: "category"}] }).then(function(product){
            if (product) {
              let pos = carritoController.verificar(carrito, externalId);
              //si no se encuentra en el carrito => posicion -1
              if(pos == -1) {
                let datos = {
                    id: product.id,
                    external : externalId,
                    name:product.name,
                    image: product.image,
                    description:product.description,
                    cantidad: 1, //cuando es la primera vez le ponemos 1
                    price:product.price,
                    total: product.price
                };
                carrito.push(datos);
              } else {
                //si se encuentra en el carrito aumentamos en uno y multiplicamos el precio
                let dato = carrito[pos];
                dato.cantidad = dato.cantidad +1;
                dato.total = dato.cantidad * dato.price;
                carrito[pos] = dato;
              }
              req.session.carrito = carrito;
              //enviamos el carrito modificado
              res.status(200).json(req.session.carrito)
            }
        })
    },

    quitarItem(req, res) {
        let carrito = req.session.carrito;
        let externalId = req.params.id;
        let pos = carritoController.verificar(carrito, externalId);
        let dato = carrito[pos];
        //disminuimos en uno el producto si es que está en el carrito
        if (dato.cantidad > 1) {
            dato.cantidad = dato.cantidad - 1;
            dato.total = dato.cantidad * dato.price;
            carrito[pos] = dato;
            req.session.carrito = carrito;
            res.status(200).json(req.session.carrito)
        } else {
        //caso contrario tenemos que eliminar el item
        let aux = [];
        for ( let i; i<carrito.length; i++) {
            let items = carrito[i];
            if(items.external != externalId) {
                aux.push(items);
            }
        }
        req.session.carrito = aux;
        res.status(200).json(req.session.carrito);

        }
    },

    mostrarCarrito(req, res) {
        res.status(200).json.session.carrito
    },
 
    //Verificamos si existe el producto en la lista del carrito 

     verificar(list, id) {
        let pos = -1;
        for (let i; i<list.length;i++) {
            if (list[i].external == id) {
                pos = i;
                break;
            }
        }

    }


}


module.exports = carritoController