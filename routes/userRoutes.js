const express = require('express');
const userRoutes = express.Router();

const usersController = require('../controllers/usersController');


userRoutes.post('/', usersController.create);
userRoutes.get('/', usersController.index);
userRoutes.get('/:username', usersController.show);
userRoutes.get('/id/:id', usersController.find);
userRoutes.put('/:id', usersController.update);

module.exports = userRoutes;
