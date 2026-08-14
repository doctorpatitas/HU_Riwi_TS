import { Schema, model } from 'mongoose';

interface TL {
    tl_name: string;
    age: number;
    identification_number: number;
    route: 'AI'|'data science'|'Node with Nest.js'|'Angular'
}

const TLSchema = new Schema<TL>(
    {
        tl_name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        identification_number: {
            type: Number,
            required: true,
            unique: true
        },
        route: {
            type: String,
            enum: ['AI','data science','Node with Nest.js','Angular',],
        }
    },
    {
        timestamps: true
    }
);

export const TL = model<TL>("TL", TLSchema);