/**
 * Gets all the data (strings) from the backend Api
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_DATA } from 'containers/App/constants';
import { dataLoaded, dataLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { BASE_URL } from 'utils/baseUrl';
/**
 * data request/response handler
 */
export function* getData() {
  const requestURL = `${BASE_URL}/api`;

  try {
    // Call our request helper (see 'utils/request')
    const response = yield call(request, requestURL);
    yield put(dataLoaded(response));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getApiData() {
  // Watches for LOAD_DATA actions and calls getData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_DATA, getData);
}
