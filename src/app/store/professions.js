import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import isOutDated from "../utils/isOutDated";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer } = professionsSlice;
const { professionsRequested, professionsReceived, professionsRequestFailed } =
    professionsSlice.actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.fetchAll();
            dispatch(professionsReceived(content));
        } catch (e) {
            dispatch(professionsRequestFailed(e.message));
        }
    }
};

export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfs = () => (state) => state.professions.entities;

export const getProfessionById = (id) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find(p => p._id === id);
    }
};

export default professionsReducer;
