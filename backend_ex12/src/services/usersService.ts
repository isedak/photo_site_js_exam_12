import IResponse from "../interfaces/IResponse";
import IUserDto from "../interfaces/IUserDto";
import IUserGetDto from "../interfaces/IUserGetDto";
import { mongo, Mongo } from "../repository/mongo";

export class UsersService {

    private repository: Mongo;

    constructor() {
        this.repository = mongo;
    };

    public register = async (user: IUserDto):
        Promise<IResponse<IUserGetDto | undefined>> => {
        return await this.repository.register(user);
    };

    public login = async (userDto: IUserDto):
        Promise<IResponse<{ username: string, token: string } | undefined>> => {
        return await this.repository.login(userDto);
    };
};

export const usersService = new UsersService();