import { FunctionComponent, ReactElement, useEffect } from "react";
import { AppDispatch, AppState } from "../../store/store";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import './PhotosPage.css';
import { getPhotos } from "../../store/photos/photos.slice";
import Loader from "../../components/UI/Loader/Loader";
import Photos from "../../components/Photos/Photos";

const PhotosPage: FunctionComponent = (): ReactElement => {

    const dispatch: AppDispatch = useDispatch();    
    const { photos, showError, errorMessage, loading } = useSelector((state: AppState) => state.photos, shallowEqual);

    useEffect(() => {
        dispatch(getPhotos());
    }, []);

    return (
        <div className="PhotosPage-container">
            <div className="PhotosPage-background PhotosPage-flex-row">
                <div className="PhotosPage-column">
                    <h2 className="PhotosPage-title">Photos:</h2>
                    {showError ? <p className='PhotosPage-error-text'>{errorMessage}</p> : null}
                    {loading ?
                        <Loader />
                        :
                        photos === undefined || !photos.length ?
                            <p className='PhotosPage-error-text'>No photos</p>
                            :
                            <Photos photos={photos} homepage={true} /> 
                    }
                </div>
            </div>
        </div>
    );
};

export default PhotosPage;