import types from "./types"

const weapons = (state = [], action) =>{
    let result = []
    switch (action.type){
        case types.WEAPONS_ADD_WEAPONS: return[...state,...action.payload.weapons.map(weapon=>{
            let result = weapon
            result.owned = false
            result.mastered = false
            return result
        })]
        case types.WEAPONS_SUCCESS: return[...state,...action.payload.map(weapon=> {
            let result = weapon
            result.owned = false
            result.mastered = false
            return result
        })]
        case types.WEAPONS_ADD: return[...state,action.payload]
        case types.WEAPONS_DELETE: result=[];
            // eslint-disable-next-line array-callback-return
            state.map(weapon=>{
                if (weapon.name!==action.payload.name){
                    result.push(weapon)
                }
            })
            return [...result]
        case types.WEAPONS_UPDATE: result=[];
            // eslint-disable-next-line array-callback-return
            state.map(weapon=>{
                if (weapon.name!==action.payload.name){
                    result.push(weapon)
                }
                else{
                    result.push(action.payload)
                }
            })
            return [...result]
        default: return state
    }
}

const weaponsReducers = {weapons}

export default weaponsReducers