const Connection  = require('../database');

class NodoService{
    database;
    constructor(){
        this.database = new Connection;
    }

    async GetNodos(){
        return await this.database.GetModosAndConnections();
    }
}

module.exports = NodoService;