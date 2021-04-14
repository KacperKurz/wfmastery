import types from "./types"

const warframes = (state = [], action) =>{
    let result=[]
    switch (action.type){
        case types.WARFRAMES_ADD_WARFRAMES: return[...state,...action.payload.warframes.map(warframe=> {
            let result = warframe
            result.owned = false
            result.mastered = false
            return result
        })]
        case types.WARFRAMES_SUCCESS: return[...state,...action.payload.map(warframe=> {
            let result = warframe
            result.owned = false
            result.mastered = false
            return result
        })]
        case types.WARFRAMES_ADD: return [...state,action.payload]
        case types.WARFRAMES_DELETE: result=[];
            // eslint-disable-next-line array-callback-return
        state.map(warframe=>{
            if (warframe.name!==action.payload.name){
                result.push(warframe)
            }
        })
            return [...result]
        case types.WARFRAMES_UPDATE: result=[];
            // eslint-disable-next-line array-callback-return
            state.map(warframe=>{
                if (warframe.name!==action.payload.name){
                    result.push(warframe)
                }
                else{
                    result.push(action.payload)
                }
            })
            return [...result]
        default: return state
    }
}

const warframesReducers = {warframes}

export default warframesReducers