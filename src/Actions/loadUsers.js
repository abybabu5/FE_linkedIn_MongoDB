export const loadUsers = searchString => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_LOADING"
        });

        const response = await fetch('/profile/');
        const json = await response.json();

        if (json.Search && response.ok){
            dispatch({
                type: "LOAD_SEARCHPROFILE",
                payload: {
                    result: json.Search,
                    search: searchString
                }
            });
            dispatch({
                type: "RESET_LOADING"
            });
            dispatch({
                type: "HIDE_ERROR",
            })
        }
        else {
            dispatch({
                type: "SHOW_ERROR",
                payload: json.Error || "Something went wrong with the request. Try later"
            });
            dispatch({
                type: "RESET_LOADING"
            })
        }
    }
};