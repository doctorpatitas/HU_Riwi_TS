import express, { type Request, type Response } from 'express';
import { Clan } from '../models/clan.model.js';

const route = express.Router();

route.get('/:id', async(req: Request, res: Response) => {

    try {
        const clan = await Clan.findById(req.params.id).populate('Track');

        if(!clan){
            return res.status(404).json({message: "Clan no encontrado"});
        }

        res.status(201).json({message:"Clan encontrado con exito", clan});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});