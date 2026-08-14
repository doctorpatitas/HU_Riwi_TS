import { Schema, model, Types } from 'mongoose';

interface Coder {
    coder_name: string;
    age: number;
    clan: Types.ObjectId;
}

const coderSchema = new Schema<Coder>(
    {
        coder_name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        clan: {
            type: Schema.Types.ObjectId,
            ref: 'Clan'
        }
    },
    {
        timestamps: true
    }
);

export const Coder = model<Coder>("Coder", coderSchema);