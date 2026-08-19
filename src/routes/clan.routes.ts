import express, { type Request, type Response } from 'express';
import { Clan } from '../models/clan.model.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

route.post('/', async(req: Request, res: Response) => {

    try {
        const {clan_name, track} = req.body;

        const newCoder = await Clan.create({clan_name, track});

        res.status(201).json({message: "Clan creado con exito", newCoder});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

/**
 * @swagger
 * /clan:
 *   get:
 *     summary: Listar todos los clanes, incluyendo su track
 *     tags:
 *       - Clan
 *     responses:
 *       200:
 *         description: Lista de clanes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Clan'
 *       500:
 *         description: Error inesperado del servidor
 */
////Busca y entrega todos los clanes existentes
route.get('/', async(req: Request, res: Response) => {

    try {
        const getClan = await Clan.find().populate('track');

        res.status(200).json({message: "Clanes encontrados con exito", getClan})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }
});

/**
 * @swagger
 * /clan/{id}:
 *   get:
 *     summary: Obtener un clan por su id, incluyendo su track
 *     tags:
 *       - Clan
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clan encontrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clan'
 *       404:
 *         description: Clan no encontrado
 *       500:
 *         description: Error inesperado del servidor
 */
//Busca y entrega un clan por Id
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