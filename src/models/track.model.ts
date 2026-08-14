import { Schema, model, Types } from 'mongoose';

interface ITrack {
    track_name: string;
    tl: Types.ObjectId;
}

const trackSchema = new Schema<ITrack>(
    {
        track_name: {
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

export const Track = model<ITrack>("Track", trackSchema);