import { useReducer, useEffect } from 'react';
import dataReducer, { SET_SOCKET, SET_MESSAGE } from '../reducers/dataReducer';

const useSocket = url => {
  const [state, dispatch] = useReducer(dataReducer, {
    socket: null,
    currentUser: { name: 'Anonymous' },
    messages: [],
  });

  const handleMessage = msg => {
    const message = JSON.parse(msg.data);

    console.log(message);
    dispatch({ type: SET_MESSAGE, message });
  };

  useEffect(() => {
    const socket = new WebSocket(url);

    dispatch({ type: SET_SOCKET, socket });
  }, [url]);

  useEffect(() => {
    if (state.socket) {
      state.socket.onopen = () => console.log('Connected to Socket Server');
      state.socket.onmessage = handleMessage;
      state.socket.onclose = () =>
        console.log('Disconnected from Socket Server');

      return () => {
        state.socket.onopen = null;
        state.socket.onmessage = null;
        state.socket.onclose = null;
      };
    }
  }, [state.socket]);

  return {
    state,
    dispatch,
  };
};

export default useSocket;
