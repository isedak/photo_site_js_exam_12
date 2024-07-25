import { createSlice } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '../createAppAsyncThunc';
import { photosApi } from '../../api/photosApi';
import IPhotoWithAuthor from '../../interfaces/IPhotoWithAuthor';
import IPhotosState from './IPhotosState';
import IUserGetDto from '../../interfaces/IUserGetDto';
import IPhotosGetByAuthor from '../../interfaces/IPhotosGetByAuthor';

const namespace = 'photos';

export const getPhotos = createAppAsyncThunk(
    `${namespace}/getPhotos`,
    async () => {
        return photosApi.getPhotos();
    }
);

export const getPhotosByAuthor = createAppAsyncThunk(
    `${namespace}/getPhotosByAuthor`,
    async (id: string) => {
        return photosApi.getPhotosByAuthor(id);
    }
);

export const addPhoto = createAppAsyncThunk(
    `${namespace}/addPhoto`,
    async (photo: FormData) => {
        return photosApi.addPhoto(photo);
    }
);

export const deletePhoto = createAppAsyncThunk(
    `${namespace}/deletePhoto`,
    async (id: string) => {
        return photosApi.deletePhoto(id);
    }
);

export const photosSlice = createSlice({
    name: namespace,
    initialState: {
        photos: [] as IPhotoWithAuthor[],
        currentAuthor: {} as IUserGetDto,
        showError: false,
        errorMessage: '',
        showAddError: false,
        errorAddMessage: '',
        loading: false
    } as IPhotosState,
    reducers: {
        clearErrors(state) {
            state.errorMessage = '';
            state.showError = false;
            state.showAddError = false;
            state.errorAddMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPhotos.rejected, (state, action) => {
                state.loading = false;
                state.showError = true;
                state.errorMessage = String(action.payload);
            })
            .addCase(getPhotos.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPhotos.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 1) {
                    state.photos = action.payload.result as IPhotoWithAuthor[];
                } else {
                    state.showError = true;
                    state.errorMessage = action.payload.message;
                };
            })
            .addCase(getPhotosByAuthor.rejected, (state, action) => {
                state.loading = false;
                state.showError = true;
                state.errorMessage = String(action.payload);
            })
            .addCase(getPhotosByAuthor.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPhotosByAuthor.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.status === 1) {
                    const result = action.payload.result as IPhotosGetByAuthor
                    state.photos = result.photos;
                    state.currentAuthor = result.author as IUserGetDto;
                } else {
                    state.showError = true;
                    state.errorMessage = action.payload.message;
                };
            })
            .addCase(addPhoto.rejected, (state, action) => {
                state.showError = true;
                state.errorMessage = String(action.payload);
            })
            .addCase(addPhoto.fulfilled, (state, action) => {
                if (action.payload.status === 0) {
                    state.showAddError = true;
                    state.errorAddMessage = action.payload.message;                    
                } else {
                    state.showError = false;
                    state.errorMessage = '';
                    const photo = action.payload.result;
                    if (photo) {
                        state.photos.unshift(photo);
                    };
                };
            })
            .addCase(deletePhoto.rejected, (state, action) => {
                state.showError = true;
                state.errorMessage = String(action.payload);
            })
            .addCase(deletePhoto.fulfilled, (state, action) => {
                if (action.payload.status === 0) {
                    state.showError = true;
                    state.errorMessage = action.payload.message;
                } else {
                    state.showError = false;
                    state.errorMessage = '';
                    const array: IPhotoWithAuthor[] =
                        state.photos.filter((p) => p._id !== action.payload.result?._id);
                    state.photos = array;
                };
            })
    }
});

export const {
    clearErrors
} = photosSlice.actions;