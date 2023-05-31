const NodoService = require("../service/NodoService");


const GetNodos = (req, res) => {
    let nodoService = new NodoService();
    let respuesta = nodoService.GetNodos();
    respuesta.then(result => {
        res.send(result);   
    });
}

module.exports = { GetNodos };