import {type Request, type Response, type NextFunction } from "express";


export function validarCoder(req: Request, res: Response, next: NextFunction){

    const { coder_name, age, clan } = req.body;

    if(!coder_name || typeof coder_name !== 'string'){
        return res.status(400).json({message: "coder_name es requerido y debe ser texto"});
    }

    if(!age || typeof age !== 'number'){
        return res.status(400).json({message: "age es requerido y debe ser un numero"});
    }

    if(!clan || typeof clan !== 'string'){
        return res.status(400).json({message: "clan es requerido y debe ser texto"});
    }

    next();

}

export function validarActualizarCoder (req: Request, res: Response, next: NextFunction){

    const { coder_name, age, clan } = req.body;

    if (coder_name !== undefined && typeof coder_name !== 'string'){
        return res.status(400).json({ message: "coder_name debe ser texto" });
    }

    if (age !== undefined && typeof age !== 'number'){
        return res.status(400).json({ message: "age debe ser un numero" });
    }

    if (clan !== undefined && typeof clan !== 'string'){
        return res.status(400).json({ message: "clan debe ser texto" });
    }

    next();

}
