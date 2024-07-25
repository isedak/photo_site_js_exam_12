import IPhotoWithAuthor from "./IPhotoWithAuthor";
import IUserGetDto from "./IUserGetDto";

export default interface IPhotosGetByAuthor {
    photos: IPhotoWithAuthor[]
    author: IUserGetDto | null
};