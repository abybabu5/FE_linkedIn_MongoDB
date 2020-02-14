import Api from "../Api";

export default function(state = {}, action) {
    switch(action.type) {
        case "LOAD_POST":
            return  action.payload;
        case "LOAD_COMMENTS":
            return {
                ...state,
                Posts: action.payload
            };
        default:
            return state;
    }
}