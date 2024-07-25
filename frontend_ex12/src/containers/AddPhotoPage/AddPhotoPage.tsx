import React, { ChangeEvent, useRef, useState } from "react";
import './AddPhotoPage.css';
import { useNavigate } from "react-router-dom";
import { AppDispatch, AppState } from "../../store/store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DarkButton from "../../components/UI/DarkButton/DarkButton";
import IPhotoCreateDto from "../../interfaces/IPhotoCreateDto";
import { addPhoto, clearErrors, getPhotos } from "../../store/photos/photos.slice";

const AddPhotoPage: React.FunctionComponent = (): React.ReactElement => {
    const navigate = useNavigate();
    const fileInput = useRef(null);
    const dispatch: AppDispatch = useDispatch();
    const { showAddError, errorAddMessage } = useSelector((state: AppState) => state.photos, shallowEqual);
    const [imageErrorMessage, setImageErrorMessage] = useState<string>('');
    const [titleErrorMessage, setTitleErrorMessage] = useState<string>('');
    const [newPhoto, setNewPhoto] = useState<IPhotoCreateDto>({
        title: '',
        image: undefined
    });

    const [fileName, setFileName] = useState<string>('');

    const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        dispatch(clearErrors());
        setImageErrorMessage('');
        setTitleErrorMessage('');
        setNewPhoto(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        });
    };

    const inputFileHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        setImageErrorMessage('');
        if (!(e.target.files && e.target.files[0])) {
            setImageErrorMessage('File is required!');
            return;
        };
        if (!(/\.(jpg|jpeg|png|gif)$/i.test(e.target.files[0].name))) {
            setImageErrorMessage('Please select a valid image file (jpg, jpeg, png or gif)');
            return;
        };
        if(!(e.target.files[0].name.match(/[\p{Letter}\p{Mark}]+/gu))) {
            setImageErrorMessage('Please rename filename (only latin letters)');
            return;
        };
        setNewPhoto(prevState => {
            return {
                ...prevState,
                image: e.target.files ? e.target.files[0] : undefined
            };
        });
        setFileName(e.target.files[0].name);
    };

    const cancelFileHandler = () => {
        const currentInput = fileInput.current! as { value: string };
        currentInput.value = '';
        setFileName('');
        setNewPhoto(prevState => {
            return {
                ...prevState,
                image: undefined
            };
        });
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPhoto.title.trim() === '') {
            setTitleErrorMessage('Title is required!');
            return;
        };
        const formData = new FormData();
        Object.entries(newPhoto).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value)
        })
        dispatch(addPhoto(formData));
        dispatch(getPhotos());
        navigate('/');
    };

    return (
        <div className="AddPhotoPage-container">
            <div className="AddPhotoPage-background AddPhotoPage-flex-row">
                <div className="AddPhotoPage-column">
                    <h2 className="AddPhotoPage-title">Add new photo:</h2>
                    <div className="AddPhotoPage-form-column">
                        {showAddError ? <p className='AddPhotoPage-error-text'>{errorAddMessage}</p> : null}
                        <form onSubmit={submitHandler}>
                            <div className="AddPhotoPage-form-box">
                                <label className="AddPhotoPage-label" htmlFor='title'>Title:</label>
                                <p className='AddPhotoPage-error-text'>{titleErrorMessage}</p>
                                <input className={'AddPhotoPage-input'}
                                    type="text"
                                    onChange={inputHandler}
                                    name={'title'}
                                    value={newPhoto.title}
                                />
                                <div className="AddPhotoPage-fileInput-label-box">
                                    <label className='AddPhotoPage-fileInput-label'>
                                        <input
                                            className='AddPhotoPage-fileInput'
                                            type="file"
                                            name={'image'}
                                            onChange={inputFileHandler}
                                            ref={fileInput}
                                        />
                                        <p className="AddPhotoPage-fileInput-button">
                                            Choose file
                                        </p>
                                    </label>
                                    <p className='AddPhotoPage-error-text'>{imageErrorMessage}</p>
                                    <span className="AddPhotoPage-fileInput-filename">{fileName}</span>
                                    {fileName && (
                                        <h5 className="AddPhotoPage-fileInput-button-cancel" onClick={cancelFileHandler}>
                                            Cancel
                                        </h5>
                                    )}
                                </div>
                                <DarkButton
                                    label={'Create Photo'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPhotoPage;