const express = require('express');
const categoryRoutes = express.Router();

const categorysController = require('../controllers/categoryController');


categoryRoutes.post('/', categorysController.create);
categoryRoutes.put('/:id', categorysController.update);
categoryRoutes.get('/:userid', categorysController.findAll);
categoryRoutes.delete('/:id', categorysController.delete);
categoryRoutes.get('/id/:id', categorysController.findById);

module.exports = categoryRoutes;
