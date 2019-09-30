import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render } from 'react-testing-library';

import DataList from '../index';
import configureStore from '../../../configureStore';

describe('<DataList />', () => {
  it('should render the loading indicator when its loading', () => {
    const { container } = render(<DataList loading />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an error if loading failed', () => {
    const { queryByText } = render(
      <DataList loading={false} error={{ message: 'Loading failed!' }} />,
    );
    expect(queryByText(/Something went wrong/)).not.toBeNull();
  });

  it('should render the data if loading was successful', () => {
    const store = configureStore(
      { global: { data: ['JavaScript', 'Boilerplate'] } },
      browserHistory,
    );
    const data = ['JavaScript', 'Boilerplate'];
    const { container } = render(
      <Provider store={store}>
        <DataList data={data} error={false} />
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render anything if nothing interesting is provided', () => {
    const { container } = render(
      <DataList data={false} error={false} loading={false} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
