import { Schema, model, Types } from 'mongoose';

interface Clan {
    clan_name: string;
    route: Types.ObjectId;
}

const clanSchema = new Schema<Clan>(
    {
        clan_name: {
            type: String,
            required: true
        },
        route: {
            type: Schema.Types.ObjectId,
            ref: 'Route'
        }
    },
    {
        timestamps: true
    }
);

export const Clan = model<Clan>("Clan", clanSchema);