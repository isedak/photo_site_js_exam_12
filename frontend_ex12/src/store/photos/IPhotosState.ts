import IPhotoWithAuthor from "../../interfaces/IPhotoWithAuthor"
import IUserGetDto from "../../interfaces/IUserGetDto"

export default interface IPhotosState {
    photos: IPhotoWithAuthor[]
    currentAuthor: IUserGetDto
    showError: boolean
    errorMessage: string
    showAddError: boolean
    errorAddMessage: string
    loading: boolean
};