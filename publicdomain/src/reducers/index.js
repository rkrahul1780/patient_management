import { combineReducers } from 'redux';
const initialState = {
  contact_detail: [],
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONTACT':
      return {
        ...state,
        contact_detail: action.payload,
      };
    default:
      return state;
  }
};
export default combineReducers({
  Reducer,
});
