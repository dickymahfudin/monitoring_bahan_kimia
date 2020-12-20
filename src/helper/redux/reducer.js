import {
  API_DATA_CONTROL,
  API_DATA_USERS,
  USER_LOGIN,
  API_GET_DATA_SENSOR,
  API_GET_DATA_PEMAKAI,
  API_GET_DATA_PENAMBAHAN,
  PEMAKAI_TOTAL,
} from "./action";

let initialState = {
  dataControl: false,
  dataUsers: false,
  userLogin: false,
  dataSensors: false,
  dataPemakai: false,
  dataPenambahan: false,
  dataPemakaiTotal: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case API_DATA_CONTROL:
      return {
        ...state,
        dataControl: action.payload,
      };
    case API_DATA_USERS:
      return {
        ...state,
        dataUsers: action.payload,
      };
    case USER_LOGIN:
      return {
        ...state,
        userLogin: action.payload,
      };
    case API_GET_DATA_SENSOR:
      return {
        ...state,
        dataSensors: action.payload,
      };
    case API_GET_DATA_PEMAKAI:
      return {
        ...state,
        dataPemakai: action.payload,
      };
    case API_GET_DATA_PENAMBAHAN:
      return {
        ...state,
        dataPenambahan: action.payload,
      };
    case PEMAKAI_TOTAL:
      return {
        ...state,
        dataPemakaiTotal: action.payload,
      };

    default:
      return state;
  }
};

export default users;
