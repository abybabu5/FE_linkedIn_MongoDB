import Api from "../Api";

export const loadProfile = (user) => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_LOADING"
        });

        Api.fetch('/profile/' + user).then((response) => {
            dispatch({
                type: "LOAD_PROFILE",
                payload: response
            });
            dispatch({
                type: "RESET_LOADING"
            });
            dispatch({
                type: "HIDE_ERROR",
            });
        });

    }
};

export const loadMyProfile = (user) => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_LOADING"
        });

        Api.fetch('/profile/me').then((response) => {
            dispatch({
                type: "LOAD_MYPROFILE",
                payload: response
            });
            dispatch({
                type: "RESET_LOADING"
            });
            dispatch({
                type: "HIDE_ERROR",
            });
        });

    }
};

export const loadProfiles = (user) => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_LOADING"
        });

        Api.fetch('/profile/').then((response) => {
            dispatch({
                type: "LOAD_PROFILES",
                payload: response
            });
            dispatch({
                type: "RESET_LOADING"
            });
            dispatch({
                type: "HIDE_ERROR",
            });
        });

    }
};
