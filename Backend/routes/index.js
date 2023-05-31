const express = require('express');
const router = express.Router();
const NodoControllers = require('../controllers/NodoController');

router.get("/GetNodos",NodoControllers.GetNodos);

module.exports = router;