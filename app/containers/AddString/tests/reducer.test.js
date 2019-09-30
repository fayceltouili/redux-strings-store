import produce from 'immer';

import addStringReducer from '../reducer';
import { changeNewString } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('addStringReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      newString: '',
      loading: false,
      error: false,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(addStringReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeNewString action correctly', () => {
    const fixture = 'JavaScript';
    const expectedResult = produce(state, draft => {
      draft.newString = fixture;
    });

    expect(addStringReducer(state, changeNewString(fixture))).toEqual(
      expectedResult,
    );
  });
});
