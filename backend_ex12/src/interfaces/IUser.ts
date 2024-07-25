import { Document, ObjectId } from "mongoose";

export default interface IUser extends Document {
    _id: ObjectId
    username: string
    password: string
};