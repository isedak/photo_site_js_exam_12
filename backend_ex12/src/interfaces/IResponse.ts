import { EStatuses } from "../enums/EStatuses"

export default interface IResponse<T> {
    status: EStatuses
    result: T
    message: string
};