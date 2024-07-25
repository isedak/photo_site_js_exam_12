import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import { photosSlice } from "./photos/photos.slice";
import { usersSlice } from "./users/users.slice";

const makeStore = () => {
    return configureStore({
        reducer: {
            users: usersSlice.reducer,
            photos: photosSlice.reducer 
        }
    });
};

const store = makeStore()
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;