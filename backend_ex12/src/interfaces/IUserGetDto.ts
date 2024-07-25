import IUser from "./IUser";

export default interface IUserGetDto {
    _id: string
    username: IUser['username']
    token: string
};