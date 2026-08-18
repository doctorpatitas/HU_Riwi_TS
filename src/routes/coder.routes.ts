import express, { Router, type Request, type Response} from 'express';
import { Coder } from '../models/coder.model.js';
import { Clan } from '../models/clan.model.js';
import { validarCoder } from '../middlewares/coder.middleware.js';
import { validarActualizarCoder } from '../middlewares/coder.middleware.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

//Crear coder nuevo
route.post('/', validarCoder, async(req: Request, res: Response) => {

    try {
        const {coder_name, age, clan} = req.body;

        const newCoder = await Coder.create({coder_name, age, clan});

        res.status(201).json({message: "Coder creado con exito", newCoder});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

//Busca y entrega todos los coders existentes
route.get('/', async(req: Request, res: Response) => {

    try {
        const getCoders = await Coder.find().populate('clan');

        res.status(200).json({message: "Coders encontrados con exito", getCoders})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }
});

route.get('/by-clan/:clanId', validarIdMongo, async(req: Request, res: Response) => {

    try {
        const { clanId } = req.params;

        if(typeof clanId !== 'string'){
            return res.status(400).json({ message: "clanId inválido" });
        }

        const coderByClan = await Coder.find({clan: clanId});

        res.status(200).json({message: "Coders por clan encontrados con exito", coderByClan});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

route.get('/by-track/:trackId', validarIdMongo, async(req: Request, res: Response) => {

    try {
        const { trackId } = req.params;
        
        if(typeof trackId !== 'string'){
            return  res.status(400).json({message: "trackId inválido"});
        }

        const clanesEncontrados = await Clan.find({track: trackId});

        const clanIds = clanesEncontrados.map(clan => clan._id);

        const coderByTrack = await Coder.find({ clan: { $in: clanIds }});

        res.status(200).json({message: "Coders por ruta encontrados con exito", coderByTrack});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

//Busca y entrega un coder por Id
route.get('/:id', validarIdMongo, async(req: Request, res: Response) => {

    try {
        const getCoder = await Coder.findById(req.params.id).populate('clan');

        if(!getCoder){
            return res.status(404).json({message: "Coder no encontrada"});
        }

        res.status(200).json({message: "Coder encontrado con exito", getCoder});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

//Actualiza un coder por Id
route.put('/:id', validarIdMongo, validarActualizarCoder, async(req: Request, res: Response) => {

    try {
        const {coder_name, age, clan} = req.body;

        const updateCoder = await Coder.findByIdAndUpdate(req.params.id,
            {coder_name, age, clan},
            {
                new:true,
                runValidators: true
            });

        if(!updateCoder){
            return res.status(404).json({message: "Tarea no encontrada"});
        }

        res.status(200).json({message: "Coder actualizado con exito", updateCoder})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado con el servidor"});
    }

});

//Elimina un coder por id
route.delete('/:id', validarIdMongo, async(req: Request, res: Response) => {

    try {
        const deleteCoder = await Coder.findByIdAndDelete(req.params.id);

        if(!deleteCoder){
            return res.status(404).json({message: "Coder no encontrado"});
        }

        res.status(200).json({message: "El coder fue borrado con exito", deleteCoder});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

export default route;