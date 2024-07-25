import IPhoto from "./IPhoto";
import IUser from "./IUser";

export default interface IPhotosGetByAuthor {
    photos: IPhoto[]
    author: IUser | null
};