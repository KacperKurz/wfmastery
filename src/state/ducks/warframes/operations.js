import {createAction} from "redux-api-middleware"
import types from "./types"

const getWarframes = () => (dispatch) => dispatch(createAction({
    endpoint: "https://api.warframestat.us/warframes",
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    types: [
        types.WARFRAMES_REQUEST,
        types.WARFRAMES_SUCCESS,
        types.WARFRAMES_FAILURE
    ]

}))

const warframesOperations = {getWarframes}

export default warframesOperations