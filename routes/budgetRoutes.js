const express = require('express');
const budgetRoutes = express.Router();

const budgetController = require('../controllers/budgetController');


budgetRoutes.post('/', budgetController.create);
budgetRoutes.put('/:id', budgetController.update);
budgetRoutes.get('/:userid', budgetController.findAll);
budgetRoutes.delete('/:id', budgetController.delete);
budgetRoutes.get('/id/:id', budgetController.findById);

module.exports = budgetRoutes;
