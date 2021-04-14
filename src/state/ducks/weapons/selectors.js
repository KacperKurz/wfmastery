import {createSelector} from "reselect"


const weapons = state => state.weapons;
const getWeapons = createSelector(weapons,weapon=>
    weapon
)

const WeaponsSelectors = {
    getWeapons
}


export default WeaponsSelectors
