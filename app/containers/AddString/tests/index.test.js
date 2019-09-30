/**
 * Test the HomePage
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { AddString, mapDispatchToProps } from '../index';
import { changeNewString, addString } from '../actions';
import configureStore from '../../../configureStore';

describe('<AddString />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <AddString loading={false} error={false} newString="" />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeNewString', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeNewString).toBeDefined();
      });

      it('should dispatch changeNewString when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const newString = 'JavaScript';
        result.onChangeNewString({ target: { value: newString } });
        expect(dispatch).toHaveBeenCalledWith(changeNewString(newString));
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch addString when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(addString());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
