
import IPhoto from "../interfaces/IPhoto";
import IPhotoCreateDto from "../interfaces/IPhotoCreateDto";
import IPhotosGetByAuthor from "../interfaces/IPhotosGetByAuthor";
import IResponse from "../interfaces/IResponse";
import { Mongo, mongo } from "../repository/mongo";

export class PhotosService {
    private repository: Mongo;

    constructor() {
        this.repository = mongo;
    };

    public addPhoto = async (userId: string, photo: IPhotoCreateDto):
        Promise<IResponse<IPhoto | undefined>> => {
        return await this.repository.addPhoto(userId, photo);
    };

    public getPhotos = async (): Promise<IResponse<IPhoto[] | undefined>> => {
        return await this.repository.getPhotos();
    };

    public getPhotosByAuthor = async (userId: string):
        Promise<IResponse<IPhotosGetByAuthor | undefined>> => {
        return await this.repository.getPhotosByAuthor(userId);
    };

    public deletePhoto = async (userId: string, photoId: string):
        Promise<IResponse<IPhoto | undefined>> => {
        return await this.repository.deletePhoto(userId, photoId);
    };
};

export const photosService = new PhotosService();