/*
 * addStringReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_NEW_STRING,
  ADD_STRING_SUCCESS,
  ADD_STRING_ERROR,
  ADD_STRING,
} from './constants';

// The initial state of the App
export const initialState = {
  newString: '',
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const addStringReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NEW_STRING:
        draft.newString = action.newString;
        break;

      case ADD_STRING:
        draft.loading = true;
        draft.error = false;
        break;

      case ADD_STRING_SUCCESS:
        draft.newString = '';
        draft.loading = false;
        draft.error = false;
        break;

      case ADD_STRING_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default addStringReducer;
