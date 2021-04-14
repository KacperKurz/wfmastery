import thunk from "redux-thunk"
import {createStore, applyMiddleware, combineReducers} from "redux"
import logger from "redux-logger"
import {createMiddleware} from "redux-api-middleware"
import weaponsReducers from "./ducks/weapons/reducers";
import warframesReducers from "./ducks/warframes/reducers";

const rootReducer = combineReducers({...weaponsReducers,...warframesReducers})
const store = createStore(rootReducer,applyMiddleware(thunk,createMiddleware(),logger))

export default store