/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';
import { dataLoaded } from 'containers/App/actions';
import { stringAddingError } from '../actions';
import { ADD_STRING } from '../constants';
import addStringApi, { addString } from '../saga';

const data = {
  id: 'a5bf98c-7cfe-4531-b321-c9e99c4ce658',
  text: 'JavaScript',
};

/* eslint-disable redux-saga/yield-effects */
describe('addString Saga', () => {
  let addStringGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    addStringGenerator = addString();

    const selectDescriptor = addStringGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = addStringGenerator.next(data).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the dataLoaded action if it requests the data successfully', () => {
    const response = [
      {
        id: 'a5bf98c-7cfe-4531-b321-c9e99c4ce658',
        text: 'JavaScript',
      },
    ];
    const putDescriptor = addStringGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(dataLoaded(response)));
  });

  it('should call the stringAddingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = addStringGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(stringAddingError(response)));
  });
});

describe('addStringApi Saga', () => {
  const addStringApiSaga = addStringApi();

  it('should start task to watch for ADD_STRING action', () => {
    const takeLatestDescriptor = addStringApiSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(ADD_STRING, addString));
  });
});
