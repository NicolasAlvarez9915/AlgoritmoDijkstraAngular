const express = require('express');
const Connection = require('./database');
const app = express();
const port = process.env.port || 3000;
const routes = require('./routes');

app.use(express.json());

app.use("/api/v1",routes);



app.listen(port, () => {
    console.log('proyecto funcionando');
});