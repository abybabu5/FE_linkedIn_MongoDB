import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import NewsFeedReducer from '../Reducers/NewsFeedReducer';
import ProfileReducer from '../Reducers/ProfileReducer';
import SearchReducer from '../Reducers/SearchReducer';
import LoginReducer from '../Reducers/LoginReducer';
import thunk from "redux-thunk";
import SearchProfile from "../Components/SearchProfile";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState =
    {
        userToken: undefined,
        NewsFeed: [],
        Profile: {
            Profile: {},
            Profiles: [],
            Experiences: [],
            MyProfile: {}
        },
        SearchProfile: {
            searchResult: [],
            searchQuery: ""
        }
    };
const combinedReducers = combineReducers({
    NewsFeed: NewsFeedReducer,
    Profile: ProfileReducer,
    SearchProfile: SearchReducer
});
export default function configureStore() {
    return createStore(combinedReducers,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
};
