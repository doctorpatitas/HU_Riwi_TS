import express, { type Request, type Response } from 'express';
import { TL } from '../models/tl.model.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

route.get('/', async(req: Request, res: Response) => {

    try {
        const getTL = await TL.find();

        res.status(200).json({message: "TL's encontrados con exito", getTL})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }
});

route.get('/:id', validarIdMongo, async(req: Request, res: Response) => {

    try {
        const tl = await TL.findById(req.params.id);

        if(!tl){
            return res.status(404).json({message: "TL no encontrado"});
        }

        res.status(200).json({message: "TL encontrado con exito", tl});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

export default route;