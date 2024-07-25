import { FunctionComponent, ReactElement, useEffect } from "react";
import { AppDispatch, AppState } from "../../store/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import './UserPhotoPage.css';
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router-dom";
import { getPhotosByAuthor } from "../../store/photos/photos.slice";
import { NavLink } from "react-router-dom";
import { checkToken } from "../../store/users/users.slice";
import Photos from "../../components/Photos/Photos";


const UserPhotosPage: FunctionComponent = (): ReactElement => {

    const params = useParams();
    const { isAuth, user } = useSelector((state: AppState) => state.users, shallowEqual);
    const dispatch: AppDispatch = useDispatch();
    const { currentAuthor, photos, showError, errorMessage, loading } = useSelector((state: AppState) => state.photos, shallowEqual);

    useEffect(() => {
        dispatch(checkToken());
        dispatch(getPhotosByAuthor(String(params.id)));
    }, []);

    useEffect(() => {
        dispatch(checkToken());
        dispatch(getPhotosByAuthor(String(params.id)));
    }, [String(params.id)]);

    return (
        <div className="UserPhotosPage-container">
            <div className="UserPhotosPage-background UserPhotosPage-flex-row">
                <div className="UserPhotosPage-column">
                    <div className="UserPhotosPage-top-row">
                        <h2 className="UserPhotosPage-title">{currentAuthor.username} photos:</h2>
                        {isAuth && user && user._id === String(params.id) && currentAuthor._id === String(params.id) ?
                            <NavLink to={'/add-photo'} className="DarkButton-link">Add new photo</NavLink>
                            : null
                        }

                    </div>
                    {showError ? <p className='UserPhotosPage-error-text'>{errorMessage}</p> : null}
                    {loading ?
                        <Loader />
                        :
                        photos === undefined || !photos.length ?
                            <p className='UserPhotosPage-error-text'>No photos</p>
                            :
                            <Photos photos={photos} homepage={false} />
                    }
                </div>
            </div>
        </div>
    );
};

export default UserPhotosPage;