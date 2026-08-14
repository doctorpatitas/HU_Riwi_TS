import express, { type Request, type Response } from 'express';
import { Track } from '../models/track.model.js';

const router = express.Router();

router.get('/:id', async(req: Request, res: Response) => {

    try {
        const route = await Track.findById(req.params.id).populate('TL');

        if(!route){
            return res.status(404).json({message: "Ruta no encontrada"});
        }

        res.status(201).json({message: "Ruta encontrada con exito", route});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});
