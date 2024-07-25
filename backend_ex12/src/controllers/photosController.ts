import express, { Router, Request, Response } from 'express';
import { config } from '../index.config';
import multer from 'multer';
import shortid from "shortid";
import { PhotosService, photosService } from '../services/photosService';
import { auth } from '../middlewares/auth';
import IResponse from '../interfaces/IResponse';
import IPhoto from '../interfaces/IPhoto';
import IPhotosGetByAuthor from '../interfaces/IPhotosGetByAuthor';
import IRequestWithTokenData from '../interfaces/IRequestWithTokenData';
import IUserGetDto from '../interfaces/IUserGetDto';

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, config.images)
    },
    filename(req, file, callback) {
        callback(null, `${shortid()}__${file.originalname}`)
    }
});

const upload = multer({ storage });
export class PhotosController {
    private router: Router;
    private service: PhotosService;
    constructor() {
        this.router = express.Router();
        this.router.get('/', this.getPhotos);
        this.router.get('/users/:id', this.getPhotosByAuthor);
        this.router.post('/', [auth, upload.single('image')], this.addPhoto);
        this.router.delete('/:id', auth, this.deletePhoto);
        this.service = photosService;
    };

    public getRouter = (): Router => {
        return this.router;
    };

    private getPhotos = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IPhoto[] | undefined> = await this.service.getPhotos();
        res.send(response);
    };

    private getPhotosByAuthor = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IPhotosGetByAuthor | undefined> =
            await this.service.getPhotosByAuthor(req.params.id);
        res.send(response);
    };

    private addPhoto = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData;
        const user = req.dataFromToken as IUserGetDto;
        const photo = req.body;
        photo.image = req.file ? req.file.filename : '';
        const response = await this.service.addPhoto(user._id, photo);
        res.send(response);
    };
    
    private deletePhoto = async (expressReq: Request, res: Response): Promise<void> => {
        const req = expressReq as IRequestWithTokenData
        const user = req.dataFromToken as IUserGetDto
        const response = await this.service.deletePhoto(user._id, req.params.id);
        res.send(response);
    };
};