import IUserGetDto from "../../interfaces/IUserGetDto";

export default interface IUsersState {
    user: IUserGetDto | undefined
    isAuth: boolean
    showError: boolean
    errorMessage: string
    loginShowError: boolean
    loginErrorMessage: string
    registerShowError: boolean
    registerErrorMessage: string
    loading: boolean
};