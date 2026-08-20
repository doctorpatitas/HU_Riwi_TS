import { Schema, model, Types } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    passwordHashed: string;
}
const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        passwordHashed: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const User = model<IUser>("User", userSchema);