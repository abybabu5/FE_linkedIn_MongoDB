import Api from "../Api";

export const loadPosts = () => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_LOADING"
        });

        Api.fetch('/posts').then((response) => {
            dispatch({
                type: "LOAD_POST",
                payload: response
            });
            dispatch({
                type: "RESET_LOADING"
            });
            dispatch({
                type: "HIDE_ERROR",
            });
        });

        // if (response){
        //
        // }
        // else {
        //     dispatch({
        //         type: "SHOW_ERROR",
        //         payload:  "Something went wrong with the request. Try later"
        //     })
        //     dispatch({
        //         type: "RESET_LOADING"
        //     })
        // }
    }
};