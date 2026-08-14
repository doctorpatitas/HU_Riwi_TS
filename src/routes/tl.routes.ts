import express, { type Request, type Response } from 'express';
import { TL } from '../models/tl.model.js';

const router = express.Router();

router.get('/:id', async(req: Request, res: Response) => {

    try {
        const tl = await TL.findById(req.params.id);

        if(!tl){
            return res.status(404).json({message: "TL no encontrado"});
        }

        res.status(201).json({message: "TL encontrado con exito", tl});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});