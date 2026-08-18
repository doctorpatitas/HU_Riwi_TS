import express, { type Request, type Response } from 'express';
import { Track } from '../models/track.model.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

////Busca y entrega todos los TL existentes
route.get('/', async(req: Request, res: Response) => {

    try {
        const getTrack = await Track.find().populate('tl');

        res.status(200).json({message: "Rutas encontradas con exito", getTrack})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }
});

//Busca y entrega un TL por Id
route.get('/:id', validarIdMongo, async(req: Request, res: Response) => {

    try {
        const trackFound = await Track.findById(req.params.id).populate('tl');

        if(!trackFound){
            return res.status(404).json({message: "Ruta no encontrada"});
        }

        res.status(200).json({message: "Ruta encontrada con exito", trackFound});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

export default route;
