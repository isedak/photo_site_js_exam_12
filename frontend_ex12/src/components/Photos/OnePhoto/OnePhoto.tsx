import { FunctionComponent, MouseEvent, ReactElement, useEffect, useState } from "react";
import IOnePhotoProps from "./IOnePhotoProps";
import defaultImage from '../../../assets/img/default_img.svg'
import './OnePhoto.css'
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store/store";
import { checkToken } from "../../../store/users/users.slice";
import { deletePhoto, getPhotos, getPhotosByAuthor } from "../../../store/photos/photos.slice";
import { NavLink } from "react-router-dom";
import DarkButton from "../../UI/DarkButton/DarkButton";
import XButton from "../../UI/XButton/XButton";

const OnePhoto: FunctionComponent<IOnePhotoProps> = (props: IOnePhotoProps): ReactElement => {
    const { user, isAuth } = useSelector((state: AppState) => state.users, shallowEqual);
    const currentAuthor = useSelector((state: AppState) => state.photos.currentAuthor);
    const dispatch: AppDispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const cklickHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setShowModal(true);
    };

    const closeModal = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowModal(false);
    };

    useEffect(() => {
        dispatch(checkToken());
    }, []);

    const deleteIt = (e: MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation();
        if (isAuth && user && user._id === currentAuthor._id) {
            dispatch(deletePhoto(props._id));
            dispatch(getPhotos());
            dispatch(getPhotosByAuthor(currentAuthor._id));
        };
    };

    return (
        <>
            {showModal ?
                <div className="Modal-background">
                    <>
                        <div className="Modal-img-column">
                            <div className="Modal-row">
                                <XButton
                                    click={closeModal}
                                    label="X"
                                />
                            </div>
                            {props.image !== '' ?
                                <img className="OnePhoto-Modal-image"
                                    onError={(e) => { e.currentTarget.src = defaultImage }}
                                    src={`${import.meta.env.VITE_BASE_URL}uploads/${props.image}`} alt={'image'}
                                />
                                :
                                <img className="OnePhoto-Modal-image" src={defaultImage} alt={defaultImage}
                                />
                            }
                        </div>
                    </>
                </div>
                : null
            }
            <div className="OnePhoto-card">
                {isAuth && user && user._id === currentAuthor._id && props.homepage === false ?
                    <div className="absolute-box">
                        <DarkButton
                            click={deleteIt}
                            btnClass="DarkVine"
                            label="Delete"
                        />
                    </div>
                    :
                    null}
                <div className="OnePhoto-img-box" onClick={cklickHandler}>
                    {props.image !== '' ?
                        <img className="OnePhoto-image"
                            onError={(e) => { e.currentTarget.src = defaultImage }}
                            src={`${import.meta.env.VITE_BASE_URL}uploads/${props.image}`} alt={'image'}
                        />
                        :
                        <img className="OnePhoto-image" src={defaultImage} alt={defaultImage}
                        />
                    }
                </div>
                <div className="OnePhoto-description-box">
                    <p className='OnePhoto-title'>{props.title}</p>
                    {props.homepage ?
                        <NavLink to={`users/${props.author._id}`} className='OnePhoto-author-link'>by {props.author.username}</NavLink>
                        :
                        null
                    }

                </div>
            </div>
        </>
    );
};

export default OnePhoto;