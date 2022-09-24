const express = require("express");
const {Contenedor} = require("./contenedor.js")

const contenedor = new Contenedor("producto.txt")

//crear el servidor
const app = express();

//levantar el servidor
app.listen(8080,()=>{
    console.log("server listening on port 8080")
})

//configurar las rutas
app.get("/productos", async (request, response)=>{
    const contenido = await contenedor.getAll()
    response.json(contenido)
})
//ruta para producto random
app.get("/productoRandom", async (request, response)=>{
    const contenido = await contenedor.getAll()
    const random= parseInt(Math.random()*contenido.length+1)
    response.send(contenido[random])
})

