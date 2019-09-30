import produce from 'immer';

import appReducer from '../reducer';
import { loadData, dataLoaded, dataLoadingError } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loading: false,
      error: false,
      data: false,
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadData action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.data = false;
    });

    expect(appReducer(state, loadData())).toEqual(expectedResult);
  });

  it('should handle the dataLoaded action correctly', () => {
    const fixture = [
      {
        id: 'a5bf98c-7cfe-4531-b321-c9e99c4ce658',
        text: 'JavaScript',
      },
    ];
    const expectedResult = produce(state, draft => {
      draft.data = fixture;
      draft.loading = false;
      draft.error = false;
      draft.newString = false;
    });

    expect(appReducer(state, dataLoaded(fixture))).toEqual(expectedResult);
  });

  it('should handle the dataLoadingError action correctly', () => {
    const fixture = {
      msg: 'something wrong',
    };
    const expectedResult = produce(state, draft => {
      draft.error = fixture;
      draft.loading = false;
    });

    expect(appReducer(state, dataLoadingError(fixture))).toEqual(
      expectedResult,
    );
  });
});
