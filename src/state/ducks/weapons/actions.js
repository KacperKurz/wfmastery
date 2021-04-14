import types from "./types";

const deleteWeapon = (name) => ({
    type: types.WEAPONS_DELETE,
    payload: {
        name: name
    }
})

const addWeapon = (weapon) => ({
    type: types.WEAPONS_ADD,
    payload: weapon
})

const editWeapon = (weapon) => ({
    type: types.WEAPONS_UPDATE,
    payload: weapon
})



const weaponActions={
    deleteWeapon,
    addWeapon,
    editWeapon
}

export default weaponActions