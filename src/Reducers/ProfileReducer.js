export default function (state = {}, action) {
    switch (action.type) {
        case "LOAD_PROFILE":
            return {
                ...state,
                Profile: action.payload
            };
        case "LOAD_PROFILES":
            return {
                ...state,
                Profiles: action.payload
            };
        case "LOAD_EXPERIENCES":
            return {
                ...state,
                Experiences: action.payload
            };
        default:
            return state;
    }
}