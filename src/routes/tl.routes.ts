import express, { type Request, type Response } from 'express';
import { TL } from '../models/tl.model.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

route.post('/', async(req: Request, res: Response) => {

    try {
        const {tl_name, age, identification_number, route} = req.body;

        const newCoder = await TL.create({tl_name, age, identification_number, route});

        res.status(201).json({message: "TL creado con exito", newCoder});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

/**
 * @swagger
 * /tl:
 *   get:
 *     summary: Listar todos los TLs
 *     tags:
 *       - TL
 *     responses:
 *       200:
 *         description: Lista de TLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TL'
 *       500:
 *         description: Error inesperado del servidor
 */
////Busca y entrega todos los TL existentes
route.get('/', async(req: Request, res: Response) => {

    try {
        const getTL = await TL.find();

        res.status(200).json({message: "TL's encontrados con exito", getTL})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

/**
 * @swagger
 * /tl/{id}:
 *   get:
 *     summary: Obtener un TL por su id
 *     description: Retorna un TL específico según su id de MongoDB
 *     tags:
 *       - TL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId del TL
 *     responses:
 *       200:
 *         description: TL encontrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TL'
 *       404:
 *         description: TL no encontrado
 *       500:
 *         description: Error inesperado del servidor
 */
//Busca y entrega un TL por id
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