import { EStatuses } from "../enums/EStatuses"

export default interface IResponse<T> {
    result: T
    message: string
    status: EStatuses
};