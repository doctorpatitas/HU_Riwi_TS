import express, { type Request, type Response} from 'express';
import { Coder } from '../models/coder.model.js';
import { validarCoder } from '../middlewares/coder.middleware.js';
import { validarActualizarCoder } from '../middlewares/coder.middleware.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

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

route.get('/', async(req: Request, res: Response) => {

    try {
        const getCoders = await Coder.find().populate('clan');

        res.status(200).json({message: "Coders encontrados con exito", getCoders})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }
});

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