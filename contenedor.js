const fs = require("fs");

class Contenedor{
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
        this.url=`./${this.nombreArchivo}` 
    }
        
    async save(elemento){ 
        try{
            if(fs.existsSync(this.url)){ //si es que existe el archivo ====>>>
                const contenido = await fs.promises.readFile(this.url,"utf-8")
                if(contenido){ //si hay contendio en el archivo
                    const arrayElementos = JSON.parse(contenido)
                    const ultimoID=arrayElementos.reduce((acc,item)=> item.id> acc ? acc=item.id : acc, 0)
                    const nuevoElemento={ ...elemento, id:ultimoID+1}
                    arrayElementos.push(nuevoElemento)
                    await fs.promises.writeFile(this.url, JSON.stringify(arrayElementos, null, 2))
                    return nuevoElemento.id  //retorno el ID solicitado
                }else{// no hay contenido
                    const nuevoElemento={ ...elemento, id:1}
                    await fs.promises.writeFile(this.url, JSON.stringify(nuevoElemento, null, 2))
                    return nuevoElemento.id  //retorno el ID solicitado
                }
            }else{ //no existe el archivo , por lo tanto es el primer elemento
                const nuevoElemento={ ...elemento, id:1}
                await fs.promises.writeFile(this.url, JSON.stringify([nuevoElemento], null, 2))
                return nuevoElemento.id  //retorno el ID solicitado
            } 
        } catch(err) {
            console.log(err)
        }
    }

    async getById(numeroID){
        try{
            if(fs.existsSync(this.url)){
                const contenido = await fs.promises.readFile(this.url,"utf-8")
                if(contenido){ //si hay contendio en el archivo
                    const arrayElementos = JSON.parse(contenido) //obtengo todos los elementos del array del archivo
                    const nuevoElemento = arrayElementos.find(item=>item.id===id)
                    return nuevoElemento
                } else {
                    return "Archivo vacio"
                }
            }
        }
        catch(err){
            return `No existe el ID solicitado: ${numeroID} o ya fue borrado`
        }
        
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.url,"utf8");
            if(contenido){
                const nuevoArray = JSON.parse(contenido);
                return nuevoArray
            } else{
                return "Archivo vacio"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deletedById(ID){
        try {
            const contenido = await fs.promises.readFile(this.url,"utf8");
            const nuevoArray = JSON.parse(contenido);
            const arrayFiltrados= nuevoArray.filter(item=>item.id!==ID);
            await fs.promises.writeFile(this.url, JSON.stringify(arrayFiltrados, null, 2))
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.url, JSON.stringify([]));
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports={Contenedor}