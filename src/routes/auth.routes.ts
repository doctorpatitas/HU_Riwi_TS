import express, { type Request, type Response } from 'express';
import { User } from '../models/user.model.js';
import * as bcrypt from 'bcrypt'

const route = express.Router();

route.post('/register', async(req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body;

        const emailExist = await User.findOne({email});

        if(emailExist){
            return res.status(401).json({message: "Este correo ya esta en uso"});
        }

        const passwordHashed = bcrypt.hashSync(password, 10);

        const user = await User.create({
            name,
            email,
            passwordHashed
        });

        res.status(201).json({message: "Usuario creado con exito"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

route.post('/login', async(req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const userEmail = await User.findOne({email});

        if(!userEmail){
            return res.status(401).json({message: "Email es incorrecto"});
        }

        const userPassword = await bcrypt.compare(password, userEmail.passwordHashed);

        if(!userPassword){
            return res.status(401).json({message: "La contraseña es incorrecta"});
        }

        res.status(200).json({message: "Usuario encontrado con exito", userEmail})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Ha ocurrido un error inesperado en el servidor"});
    }

});

export default route;