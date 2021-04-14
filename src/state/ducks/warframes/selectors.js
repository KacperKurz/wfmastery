import {createSelector} from "reselect"


const warframes = state => state.warframes;
const getWarframes = createSelector(warframes,warframe=>
    warframe
)

const WarframeSelectors = {
    getWarframes
}


export default WarframeSelectors
