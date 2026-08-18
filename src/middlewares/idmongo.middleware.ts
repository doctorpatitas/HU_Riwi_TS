import {type Request, type Response, type NextFunction } from "express";
import mongoose from 'mongoose';

export function validarIdMongo (req: Request, res: Response, next: NextFunction){

    const idMongo = req.params.id;

    if(typeof idMongo !== 'string' || !mongoose.Types.ObjectId.isValid(idMongo)){
        return res.status(400).json({message: "El id es invalido"});
    }

    next();
}
