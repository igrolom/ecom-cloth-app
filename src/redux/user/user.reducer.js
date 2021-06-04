import {UserActionTypes} from './user.types'

/*  Reducer - function that gets 2 properties: 
1)state(last or initial) and 
2) action - object that has type(string value that tells what is this specific action is)
 and payload - can be anything/flexible property;
 
*/

const INITIAL_STATE = {
  currentUser: null,
};
// Evary single reducer gets single action when it's fired
// even if those actions are not related to this reducer
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
