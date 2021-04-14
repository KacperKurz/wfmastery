import types from "./types";

const addWarframe = (warframe) => ({
    type: types.WARFRAMES_ADD,
    payload: warframe
})

const deleteWarframe = (name) =>({
    type: types.WARFRAMES_DELETE,
    payload:{
        name: name
    }
})

const editWarframe = (warframe) => ({
    type: types.WARFRAMES_UPDATE,
    payload: warframe
})

const warframeActions={
    addWarframe,
    deleteWarframe,
    editWarframe
}

export default warframeActions