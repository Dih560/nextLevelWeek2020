import express from 'express';
import validation from './config/celebrate';


import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController;
const itemsController = new ItemsController;

//GET Requisitions
routes.get('/', (request, response) => {
    return response.json({message: 'Hello World!'});
});
routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

//POST Requisitions
routes.post(
    '/points',
    upload.single('image'),
    validation,
    pointsController.create
);

export default routes;