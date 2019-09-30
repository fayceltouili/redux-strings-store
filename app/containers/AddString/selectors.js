/**
 * AddString selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAddString = state => state.AddString || initialState;
const makeSelectNewString = () =>
  createSelector(
    selectAddString,
    AddStringState => AddStringState.newString,
  );

export { selectAddString, makeSelectNewString };
