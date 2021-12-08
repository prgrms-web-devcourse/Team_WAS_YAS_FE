const CREATE_ROUTINE = 'routine/CREATE_ROUTINE';
const UPDATE_ROUTINE = 'routine/UPDATE_ROUTINE';
const DELETE_ROUTINE = 'routine/DELETE_ROUTINE';

// interface actionType {
//   type: string;
//   routine: {};
// }

export const createRoutine = () => ({
  type: CREATE_ROUTINE,
  routine: {},
});
export const updateRoutine = () => ({
  type: UPDATE_ROUTINE,
  routine: {},
});
export const deleteRoutine = () => ({
  type: DELETE_ROUTINE,
  routine: {},
});

const initialState = [{}];

const routinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROUTINE:
      return state;
    case UPDATE_ROUTINE:
      return state;
    case DELETE_ROUTINE:
      return state;
    default:
      return state;
  }
};

export default routinesReducer;
