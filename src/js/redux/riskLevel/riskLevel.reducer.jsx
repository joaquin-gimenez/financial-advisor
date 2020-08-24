import { riskLevelsData } from "../../data";


const INITIAL_STATE = {
  riskLevels: riskLevelsData,
  activeRiskLevel: 1
}

const riskLevelReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_RISK_LEVEL':
      return {
        ...state,
        activeRiskLevel: action.payload
      }
    default:
      return state;
  }
}

export default riskLevelReducer;
