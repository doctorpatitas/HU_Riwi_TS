import { Schema, model, Types } from 'mongoose';

interface IClan {
    clan_name: string;
    track: Types.ObjectId;
}

const clanSchema = new Schema<IClan>(
    {
        clan_name: {
            type: String,
            required: true
        },
        track: {
            type: Schema.Types.ObjectId,
            ref: 'Track'
        }
    },
    {
        timestamps: true
    }
);

export const Clan = model<IClan>("Clan", clanSchema);