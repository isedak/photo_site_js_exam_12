import { EStatuses } from "../enums/EStatuses"
import IResponse from "../interfaces/IResponse"
import IUserDto from "../interfaces/IUserDto"
import IUserGetDto from "../interfaces/IUserGetDto"
import { instance } from "./instance"

class UserApi {
    
    public login = async (user: IUserDto): Promise<IResponse<IUserGetDto | undefined>> => {
        try {
            const response = await instance.post('/users/login', user);
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

    public register = async (user: IUserDto): Promise<IResponse<IUserGetDto | undefined>> => {
        try {
            const response = await instance.post('/users', user);
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

    public checkToken = async (): Promise<IResponse<IUserGetDto | undefined>> => {
        try {
            const response = await instance.get('/users/token');
            return response.data;
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

export const userApi = new UserApi();