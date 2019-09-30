/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DataList from 'components/DataList';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectData,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadData } from '../App/actions';
import saga from './saga';
import Section from './Section';

const key = 'home';

export function HomePage({ loading, error, data, loadDataFromApi }) {
  useInjectSaga({ key, saga });
  useEffect(() => {
    loadDataFromApi();
  }, []);
  const dataListProps = { loading, error, data };

  return (
    <article>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Section>
        <DataList {...dataListProps} />
      </Section>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loadDataFromApi: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export const mapDispatchToProps = dispatch => ({
  loadDataFromApi: () => dispatch(loadData()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
