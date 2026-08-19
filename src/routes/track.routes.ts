import express, { type Request, type Response } from 'express';
import { Track } from '../models/track.model.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

route.post('/', async(req: Request, res: Response) => {

    try {
        const {track_name, tl} = req.body;

        const newCoder = await Track.create({track_name, tl});

        res.status(201).json({message: "Ruta creada con exito", newCoder});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

/**
 * @swagger
 * /track:
 *   get:
 *     summary: Listar todas las rutas (tracks), incluyendo su TL
 *     tags:
 *       - Track
 *     responses:
 *       200:
 *         description: Lista de tracks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Track'
 *       500:
 *         description: Error inesperado del servidor
 */
////Busca y entrega todas las rutas existentes
route.get('/', async(req: Request, res: Response) => {

    try {
        const getTrack = await Track.find().populate('tl');

        res.status(200).json({message: "Rutas encontradas con exito", getTrack})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }
});

/**
 * @swagger
 * /track/{id}:
 *   get:
 *     summary: Obtener un track por su id, incluyendo su TL
 *     tags:
 *       - Track
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Track encontrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Track'
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error inesperado del servidor
 */
//Busca y entrega una ruta por Id
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
