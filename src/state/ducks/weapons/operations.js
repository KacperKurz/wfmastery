import {createAction} from "redux-api-middleware"
import types from "./types"

const getWeapons = () => (dispatch) => dispatch(createAction({
    endpoint: "https://api.warframestat.us/weapons",
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    types: [
        types.WEAPONS_REQUEST,
        types.WEAPONS_SUCCESS,
        types.WEAPONS_FAILURE
    ]

}))

const weaponsOperations = {getWeapons}

export default weaponsOperations