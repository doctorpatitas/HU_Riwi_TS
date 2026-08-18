import express, { type Request, type Response } from 'express';
import { Clan } from '../models/clan.model.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

route.get('/', async(req: Request, res: Response) => {

    try {
        const getClan = await Clan.find().populate('track');

        res.status(200).json({message: "Clanes encontrados con exito", getClan})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }
});

route.get('/:id', validarIdMongo, async(req: Request, res: Response) => {

    try {
        const clan = await Clan.findById(req.params.id).populate('track');

        if(!clan){
            return res.status(404).json({message: "Clan no encontrado"});
        }

        res.status(200).json({message:"Clan encontrado con exito", clan});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

export default route;