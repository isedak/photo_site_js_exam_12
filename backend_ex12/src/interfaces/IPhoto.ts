import { ObjectId } from "mongoose";
import IUser from "./IUser";

export default interface IPhoto {
    _id: ObjectId
    title: string
    image: string | File | undefined
    author: IUser | ObjectId
};