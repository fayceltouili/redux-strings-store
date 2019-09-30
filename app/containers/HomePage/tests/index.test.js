/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { HomePage, mapDispatchToProps } from '../index';
import { loadData } from '../../App/actions';
import configureStore from '../../../configureStore';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const loadDataFromApi = jest.fn();
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <HomePage loading={false} error={false} data={[]} loadDataFromApi={loadDataFromApi} />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should fetch the data on mount', () => {
    const loadDataFromApi = jest.fn();
    render(
      <Provider store={store}>
        <HomePage
          loadDataFromApi={loadDataFromApi}
        />
      </Provider>,
    );
    expect(loadDataFromApi).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {

    describe('loadDataFromApi', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.loadDataFromApi).toBeDefined();
      });

      it('should dispatch loadData when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.loadDataFromApi();
        expect(dispatch).toHaveBeenCalledWith(loadData());
      });
    });
  });
});
