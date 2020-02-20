export const SET_SOCKET = 'SET_SOCKET';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_USERNAME = 'SET_USERNAME';

const dataReducer = (state, action) => {
  // Object Lookups
  const actions = {
    SET_SOCKET: {
      ...state,
      socket: action.socket,
    },
    SET_MESSAGE: {
      ...state,
      messages: [...state.messages, action.message],
    },
    SET_USERNAME: {
      ...state,
      currentUser: { name: action.username },
    },
  };

  // return the new state
  return actions[action.type] || state;
};

export default dataReducer;
