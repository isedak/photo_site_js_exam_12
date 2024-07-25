export default interface IPhotoWithAuthor {
    _id: string
    title: string
    image: string
    author: {
        _id: string
        username: string
    }
};