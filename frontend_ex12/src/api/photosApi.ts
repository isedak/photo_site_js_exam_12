import { EStatuses } from "../enums/EStatuses";
import IPhoto from "../interfaces/IPhoto";
import IPhotoWithAuthor from "../interfaces/IPhotoWithAuthor";
import IPhotosGetByAuthor from "../interfaces/IPhotosGetByAuthor";
import IResponse from "../interfaces/IResponse";
import { instance } from "./instance";

class PhotosApi {

    public getPhotos = async (): Promise<IResponse<IPhotoWithAuthor[] | undefined>> => {
        try {
            const response = await instance.get('/photos');
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public getPhotosByAuthor = async (userId: string): Promise<IResponse<IPhotosGetByAuthor | undefined>> => {
        try {
            const response = await instance.get(`/photos/users/${userId}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public addPhoto = async (photo: FormData): Promise<IResponse<IPhotoWithAuthor | undefined>> => {
        try {
            const response = await instance.post('/photos', photo);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public deletePhoto = async (id: string): Promise<IResponse<IPhoto | undefined>> => {
        try {
            const response = await instance.delete(`/photos/${id}`);
            return response.data;
        } catch (err: unknown) {
            const error = err as Error;
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };
};

export const photosApi = new PhotosApi();