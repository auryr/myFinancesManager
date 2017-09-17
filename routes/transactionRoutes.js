const express = require('express');
const transactionRoutes = express.Router();

const transactionController = require('../controllers/transactionController');


transactionRoutes.post('/', transactionController.create);
transactionRoutes.post('/:userid', transactionController.findByDate);
transactionRoutes.put('/:id', transactionController.update);
transactionRoutes.get('/:userid', transactionController.findAll);
transactionRoutes.delete('/:id', transactionController.delete);
transactionRoutes.get('/id/:id', transactionController.findById);

module.exports = transactionRoutes;
