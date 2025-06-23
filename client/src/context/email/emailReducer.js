import {
  GET_EMAILS,
  ADD_EMAIL,
  DELETE_EMAIL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_EMAIL,
  FILTER_EMAILS,
  CLEAR_FILTER,
  EMAIL_ERROR,
  CLEAR_EMAILS
} from '../types';

const emailReducer = (state, action) => {
  switch (action.type) {
    case GET_EMAILS:
      return {
        ...state,
        emails: action.payload,
        loading: false
      };
    case ADD_EMAIL:
      return {
        ...state,
        emails: [action.payload, ...state.emails],
        loading: false
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        emails: state.emails.map(email =>
          email._id === action.payload._id ? action.payload : email
        ),
        loading: false
      };
    case DELETE_EMAIL:
      return {
        ...state,
        emails: state.emails.filter(email => email._id !== action.payload),
        loading: false
      };
    case CLEAR_EMAILS:
      return {
        ...state,
        emails: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_EMAILS:
      return {
        ...state,
        filtered: state.emails.filter(email => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            email.email.match(regex) ||
            email.provider.match(regex) ||
            (email.description && email.description.match(regex))
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case EMAIL_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default emailReducer; 