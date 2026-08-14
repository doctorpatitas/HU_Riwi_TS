import { Schema, model, Types } from 'mongoose';

interface ICoder {
    coder_name: string;
    age: number;
    clan: Types.ObjectId;
}

const coderSchema = new Schema<ICoder>(
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

export const Coder = model<ICoder>("Coder", coderSchema);