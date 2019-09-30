/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  CHANGE_NEW_STRING,
  ADD_STRING_SUCCESS,
  ADD_STRING_ERROR,
  ADD_STRING,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} newString The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_NEW_STRING
 */
export function changeNewString(newString) {
  return {
    type: CHANGE_NEW_STRING,
    newString,
  };
}

/**
 * add string, this action starts the request saga
 *
 * @return {object} An action object with a type of ADD_STRING
 */
export function addString() {
  return {
    type: ADD_STRING,
  };
}

/**
 * add string, this action starts the request saga
 *
 * @return {object} An action object with a type of ADD_STRING_SUCCESS
 */
export function stringAdded() {
  return {
    type: ADD_STRING_SUCCESS,
  };
}

/**
 * Dispatched when loading the data fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of ADD_STRING_ERROR passing the error
 */
export function stringAddingError(error) {
  return {
    type: ADD_STRING_ERROR,
    error,
  };
}
