import { Schema, model, Types } from 'mongoose';

interface IClan {
    clan_name: string;
    route: Types.ObjectId;
}

const clanSchema = new Schema<IClan>(
    {
        clan_name: {
            type: String,
            required: true
        },
        route: {
            type: Schema.Types.ObjectId,
            ref: 'Track'
        }
    },
    {
        timestamps: true
    }
);

export const Clan = model<IClan>("Clan", clanSchema);