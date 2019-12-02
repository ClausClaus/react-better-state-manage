export function dogReducer(state: any, event: any) {
  switch (event.type) {
    case 'FETCH':
      return {
        ...state,
        status: 'loading'
      };
    case 'RESOLVE':
      return {
        ...state,
        status: 'success',
        dog: event.data.message
      };
    case 'REJECT':
      return {
        ...state,
        status: 'failure',
        error: event.error
      };
    case 'CANCEL':
      return {
        ...state,
        status: 'idle'
      };
    default:
      return state;
  }
}

export const initialState = {
  status: 'idle',
  dog: null,
  error: null
};
