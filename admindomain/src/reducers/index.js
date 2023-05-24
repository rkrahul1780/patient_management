import { combineReducers } from 'redux';
const initialState = {
  signup_detail: [],
  hospital_details: [],
  doctor_details: [],
  department_details: [],
  vaccine_details: [],
  newpassword_details: [],
  consultation_details: [],
  view_consultation_details: [],
  view_vaccination_details: [],
  vaccination_details: [],
  get_consultation_details: [],
  profile_details: [],
  disease_details: [],
  edit_profile_details: [],
  consultationsById: [],
  success: null,
  consultationDataById: [],
  vacinationsById: [],
  vacinationDataById: [],
  tranaction_details: [],
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SIGNUP':
      return {
        ...state,
        signup_detail: action.payload,
      };
    case 'SET_HOSPITAL_DATA':
      return {
        ...state,
        hospital_details: action.payload,
      };
    case 'SET_DOCTOR_DATA':
      return {
        ...state,
        doctor_details: action.payload,
      };
    case 'SET_DEPARTMENT_DATA':
      return {
        ...state,
        department_details: action.payload,
      };
    case 'SET_VACCINE_DATA':
      return {
        ...state,
        vaccine_details: action.payload,
      };
    case 'SET_NEWPASSWORD':
      return {
        ...state,
        newpassword_details: action.payload,
      };
    case 'GET_CONSULTATION_DATA':
      return {
        ...state,
        get_consultation_details: action.payload,
      };
    case 'SET_CONSULTATION_DATA':
      return {
        ...state,
        consultation_details: action.payload,
      };
    case 'CONSULTATIONS_BY_ID': {
      return {
        ...state,
        consultationsById: action.payload,
        success: action.successStatus,
        consultationDataById: action.consultationData,
      };
    }
    case 'VACINATIONS_BY_ID': {
      return {
        ...state,
        vacinationsById: action.payload,
        success: action.successStatus,
        vacinationDataById: action.vacinationData,
      };
    }
    case 'VIEW_CONSULTATION':
      return {
        ...state,
        view_consultation_details: action.payload,
      };
    case 'SET_VACCINATION_DATA':
      return {
        ...state,
        vaccination_details: action.payload,
      };
    case 'VIEW_VACCINATION':
      return {
        ...state,
        view_vaccination_details: action.payload,
      };
    case 'GET_PROFILE_DATA':
      return {
        ...state,
        profile_details: action.payload,
      };
    case 'EDIT_PROFILE_DATA':
      return {
        ...state,
        edit_profile_details: action.payload,
      };
    case 'SET_DISEASE':
      return {
        ...state,
        disease_details: action.payload,
      };
    case 'SET_TRANSACTION_DATA':
      return {
        ...state,
        tranaction_details: action.payload,
      };
    default:
      return state;
  }
};
export default combineReducers({
  Reducer,
});
