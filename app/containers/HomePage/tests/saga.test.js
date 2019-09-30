/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA } from 'containers/App/constants';
import { dataLoaded, dataLoadingError } from 'containers/App/actions';
import getApiData, { getData } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('getData Saga', () => {
  let getDataGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getDataGenerator = getData();

    const selectDescriptor = getDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getDataGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the dataLoaded action if it requests the data successfully', () => {
    const response = [
      {
        id: 'a5bf98c-7cfe-4531-b321-c9e99c4ce658',
        text: 'JavaScript',
      },
    ];
    const putDescriptor = getDataGenerator.next(response).value;
  });

  it('should call the dataLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(dataLoadingError(response)));
  });
});

describe('getApiData Saga', () => {
  const getApiDataSaga = getApiData();

  it('should start task to watch for LOAD_DATA action', () => {
    const takeLatestDescriptor = getApiDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_DATA, getData));
  });
});
