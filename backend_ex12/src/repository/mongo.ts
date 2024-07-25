import mongoose, { Mongoose } from "mongoose";
import IUserDto from "../interfaces/IUserDto";
import IResponse from "../interfaces/IResponse";
import IUserGetDto from "../interfaces/IUserGetDto";
import { User } from "../models/User";
import { EStatuses } from "../enums/EStatuses";
import { generateJWT } from '../helpers/generateJWT';
import IPhoto from "../interfaces/IPhoto";
import { Photo } from "../models/Photo";
import IPhotosGetByAuthor from "../interfaces/IPhotosGetByAuthor";
import IPhotoCreateDto from "../interfaces/IPhotoCreateDto";
import IUser from "../interfaces/IUser";

export class Mongo {

    private client: Mongoose | null = null;

    public close = async (): Promise<void> => {
        if (!this.client) return;
        await this.client.disconnect();
    };

    public init = async (): Promise<void> => {
        this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL || '');
        console.log('MongoDB is connected');
    };

    public register = async (user: IUserDto): Promise<IResponse<IUserGetDto | undefined>> => {
        try {
            if (user.username === undefined || user.username.trim() === '')
                throw new Error('Username is requared!');
            if (user.password === undefined || user.password.trim() === '')
                throw new Error('Password is requared!');

            const exists = await User.exists({ username: user.username })
            if (exists) throw new Error('This username is already registered!');

            const newUser = new User(user);
            await newUser.save();
            const data: IUserGetDto = {
                _id: String(newUser._id),
                username: newUser.username,
                token: generateJWT({ _id: newUser._id, username: newUser.username })
            };
            const response: IResponse<IUserGetDto> = {
                status: EStatuses.OK,
                result: data,
                message: ''
            };
            return response;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public login = async (user: IUserDto): Promise<IResponse<{ username: string, token: string } | undefined>> => {
        try {
            if (user.username === undefined || user.username.trim() === '')
                throw new Error('Username is requared!');
            if (user.password === undefined || user.password.trim() === '')
                throw new Error('Password is requared!');

            const foundUser = await User.findOne({ username: user.username });
            if (!foundUser) throw new Error('User is not found!');

            const isMatch: boolean = await foundUser.checkPassword(user.password);
            if (!isMatch) throw new Error('Wrong password!');

            await foundUser.save();
            const data = {
                username: foundUser.username,
                token: generateJWT({ _id: foundUser._id, username: foundUser.username })
            };
            const response: IResponse<{ username: string, token: string }> = {
                status: EStatuses.OK,
                result: data,
                message: ''
            };
            return response;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public getPhotos = async (): Promise<IResponse<IPhoto[] | undefined>> => {
        try {
            const data = await Photo.find().populate('author');
            const response: IResponse<IPhoto[]> = {
                status: EStatuses.OK,
                result: data,
                message: ''
            };
            return response;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public getPhotosByAuthor = async (userId: string):
        Promise<IResponse<IPhotosGetByAuthor | undefined>> => {
        try {
            if (!userId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Author id is not valid!');
            const author = await User.findById(userId);
            if (!author) throw new Error('This author is not found!');

            const photos = await Photo.find({ author: userId });
            const data: IPhotosGetByAuthor = {
                photos: photos,
                author: author
            };
            const response: IResponse<IPhotosGetByAuthor> = {
                status: EStatuses.OK,
                result: data,
                message: ''
            };
            return response;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public deletePhoto = async (userId: string, photoId: string):
        Promise<IResponse<IPhoto | undefined>> => {
        try {
            if (!userId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Author id is not valid!');
            const foundUser = await User.findById(userId);
            if (!foundUser) throw new Error('Unauthorized!');

            if (!photoId.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Photo id is not valid!');
            const foundPhoto = await Photo.findById(photoId);
            if (!foundPhoto) throw new Error('Photo is not found.');

            if (String(foundPhoto.author) !== String(foundUser?._id))
                throw new Error('You have no permission to delete it!');

            const data: IPhoto | null = await Photo.findOneAndDelete({ _id: photoId });
            const response: IResponse<IPhoto | undefined> = {
                status: EStatuses.OK,
                result: data || undefined,
                message: ''
            };
            return response;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };

    public addPhoto = async (userId: string, photo: IPhotoCreateDto): Promise<IResponse<IPhoto | undefined>> => {
        try {
            const foundUser = await User.findById(userId);
            if (!foundUser) throw new Error('Unauthorized!');

            if (photo.title === undefined || photo.title.trim() === '')
                throw new Error('Photo title is required!');
            if (photo.image === '') throw new Error('Image is required!');

            const newPhoto = new Photo({ ...photo, author: userId });
            const data = await newPhoto.save();
            const photoForReturn = {
                _id: data._id,
                title: data.title,
                image: data.image,
                author: {
                    _id: foundUser._id,
                    username: foundUser.username
                } as IUser
            };            
            const response: IResponse<IPhoto> = {
                status: EStatuses.OK,
                result: photoForReturn,
                message: ''
            };
            return response;
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<undefined> = {
                status: EStatuses.NOT_OK,
                result: undefined,
                message: error.message
            };
            return response;
        };
    };
};

export const mongo = new Mongo();