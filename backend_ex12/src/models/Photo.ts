import mongoose, { Schema } from "mongoose";
import IPhoto from "../interfaces/IPhoto";


const PhotoSchema: Schema = new Schema<IPhoto>({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    versionKey: false
});

export const Photo = mongoose.model<IPhoto>('Photo', PhotoSchema);