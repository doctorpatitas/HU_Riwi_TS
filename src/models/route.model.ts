import { Schema, model, Types } from 'mongoose';

interface Route {
    route_name: string;
    tl: Types.ObjectId;
}

const routeSchema = new Schema<Route>(
    {
        route_name: {
            type: String,
            required: true
        },
        tl: {
            type: Schema.Types.ObjectId,
            ref: 'TL'
        }
    },
    {
        timestamps: true
    }
);

export const Route = model<Route>("Route", routeSchema);