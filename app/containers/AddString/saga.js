/**
 * Add a new string to the backend Api
 */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ADD_STRING } from 'containers/AddString/constants';
import { dataLoaded } from 'containers/App/actions';
import { stringAdded, stringAddingError } from 'containers/AddString/actions';
import { push } from 'react-router-redux';
import request from 'utils/request';
import { makeSelectNewString } from 'containers/AddString/selectors';
import { BASE_URL } from 'utils/baseUrl';
import uuid from 'uuid/v4';

/**
 * Backend Api request/response handler
 */
export function* addString() {
  const newString = {
    id: uuid(),
    text: yield select(makeSelectNewString()),
  };
  const requestURL = `${BASE_URL}/api/add`;
  const options = {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(newString),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // Call our request helper
    const response = yield call(request, requestURL, options);
    yield put(dataLoaded(response));
    yield put(stringAdded());
    yield put(push('/'));
  } catch (err) {
    yield put(stringAddingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* addStringApi() {
  // Watches for ADD_STRING actions and calls addStringApi when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(ADD_STRING, addString);
}
