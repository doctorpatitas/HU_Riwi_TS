import express, { type Request, type Response} from 'express';
import { Coder } from '../models/coder.model.js';
import { Clan } from '../models/clan.model.js';
import { validarCoder } from '../middlewares/coder.middleware.js';
import { validarActualizarCoder } from '../middlewares/coder.middleware.js';
import { validarIdMongo } from '../middlewares/idmongo.middleware.js';

const route = express.Router();

/**
 * @swagger
 * /coder:
 *   post:
 *     summary: Crear un nuevo coder
 *     tags:
 *       - Coder
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coder_name
 *               - age
 *               - clan
 *             properties:
 *               coder_name:
 *                 type: string
 *                 example: "Diego"
 *               age:
 *                 type: number
 *                 example: 18
 *               clan:
 *                 type: string
 *                 example: "64a1b2c6d4e5f6a7b8c9d0e1"
 *     responses:
 *       201:
 *         description: Coder creado con éxito
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error inesperado del servidor
 */
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

/**
 * @swagger
 * /coder:
 *   get:
 *     summary: Listar todos los coders, incluyendo su clan
 *     tags:
 *       - Coder
 *     responses:
 *       200:
 *         description: Lista de coders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coder'
 *       500:
 *         description: Error inesperado del servidor
 */
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

/**
 * @swagger
 * /coder/by-clan/{clanId}:
 *   get:
 *     summary: Listar los coders de un clan específico
 *     tags:
 *       - Coder
 *     parameters:
 *       - in: path
 *         name: clanId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coders del clan encontrados
 *       500:
 *         description: Error inesperado del servidor
 */
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

/**
 * @swagger
 * /coder/by-track/{trackId}:
 *   get:
 *     summary: Listar los coders de un track específico
 *     tags:
 *       - Coder
 *     parameters:
 *       - in: path
 *         name: trackId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coders del track encontrados
 *       500:
 *         description: Error inesperado del servidor
 */
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

/**
 * @swagger
 * /coder/{id}:
 *   get:
 *     summary: Obtener un coder por su id, incluyendo su clan
 *     tags:
 *       - Coder
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coder encontrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coder'
 *       404:
 *         description: Coder no encontrado
 *       500:
 *         description: Error inesperado del servidor
 */
//Busca y entrega un coder por Id
route.get('/:id', validarIdMongo, async(req: Request, res: Response) => {

    try {
        const getCoder = await Coder.findById(req.params.id).populate('clan');

        if(!getCoder){
            return res.status(404).json({message: "Coder no encontrado"});
        }

        res.status(200).json({message: "Coder encontrado con exito", getCoder});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

/**
 * @swagger
 * /coder/{id}:
 *   put:
 *     summary: Actualizar un coder por su id
 *     tags:
 *       - Coder
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coder_name:
 *                 type: string
 *               age:
 *                 type: number
 *               clan:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coder actualizado con éxito
 *       404:
 *         description: Coder no encontrado
 *       500:
 *         description: Error inesperado del servidor
 */
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

/**
 * @swagger
 * /coder/{id}:
 *   delete:
 *     summary: Eliminar un coder por su id
 *     tags:
 *       - Coder
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coder eliminado con éxito
 *       404:
 *         description: Coder no encontrado
 *       500:
 *         description: Error inesperado del servidor
 */
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