export default interface IOnePhotoProps {
    key: string
    _id: string
    title: string
    image: string
    author: {
        _id: string
        username: string
    }
    homepage: boolean
};