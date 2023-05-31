const mysql = require('mysql');
const Nodo = require('../Models/Nodo');
const ConexionNodo = require('../Models/ConexionNodo');
const { resolve } = require('path');





class Connection{
    
        
    constructor(){
        
    }

    async GetModosAndConnections(){
        return new Promise((resolve, reject) =>{
            let respuesta =  this.GetNodos();
            respuesta.then(nodos =>{
                let respuestaNodos =  this.GetConeccionNodos(nodos);
                respuestaNodos.then(NodosConConecciones =>{
                    resolve(NodosConConecciones);
                });
            });
        });
        
    }

    async GetNodos(){
        const connection = this.configurarConeccion();

        try {

            connection.connect(); 
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM Nodo`;
                connection.query(query, (error, results, fields) => {
                  if (error) {
                    reject(error);
                  } 
                  let nodos = [];
                  results.forEach(item => {
                      let nodo = new Nodo();
                      nodo.id = item.id;
                      nodo.nombre = item.nombre;
                      nodo.tipo = item.tipo;
                      nodos.push(nodo);
                  });
                  
                  resolve(nodos);
                });
              });
                    
        } catch (error) {
            console.error(error);
        } finally {
            connection.end();
        }

    }

    
    async GetConeccionNodos(nodos){
        const connection = this.configurarConeccion();
        try{
            
            connection.connect();
            let ids = nodos.map(item => item.id);
            return new Promise((resolve, reject) => {
                    
                connection.query('Select * from conexionnodo where nodoInicio in ('+ids.toString()+')', (err, results, field) => {
                    if(err){
                        reject(err);
                    }
                    nodos.forEach(item =>{
                        results.forEach(itemConnection  => {
                            if(itemConnection.nodoInicio === item.id)
                            {
                                let conexionNodo = new ConexionNodo();
                                conexionNodo.id = itemConnection.id;
                                conexionNodo.nodoFin = itemConnection.nodoFin;
                                conexionNodo.nodoInicio = itemConnection.nodoInicio;
                                conexionNodo.peso = itemConnection.peso;
                                conexionNodo.valor = itemConnection.valor;
                                item.nodosConectados.push(conexionNodo);
                            }
                        });
                    });
                    resolve(nodos);
                });
            });
        } catch (error) {
            console.error(error);
        } finally {
            connection.end();
        }
    }
    configurarConeccion(){
        return mysql.createConnection({
            host: 'localhost',
            database: 'Dijkstra',
            user: 'root',
            password: ''
        });
    }
}

module.exports = Connection;