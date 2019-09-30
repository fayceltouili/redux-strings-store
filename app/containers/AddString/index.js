/*
 * addString
 *
 * user can add strings, at the '/Add' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import DataList from 'components/DataList';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import { makeSelectNewString } from 'containers/AddString/selectors';
import Form from './Form';
import Input from './Input';
import Button from './button';
import Section from './Section';
import { addString, changeNewString } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'AddString';

export function AddString({
  newString,
  loading,
  error,
  onSubmitForm,
  onChangeNewString,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const dataListProps = { loading, error };

  return (
    <article>
      <Helmet>
        <title>Add New String</title>
        <meta
          name="description"
          content="A React.js Boilerplate application Add New String"
        />
      </Helmet>
      <Section>
        <Form onSubmit={onSubmitForm}>
          <label htmlFor="newString">
            <Input
              id="newString"
              type="text"
              placeholder="Enter something"
              value={newString || ''}
              onChange={onChangeNewString}
            />
          </label>
          <Button disabled={!newString}>Add</Button>
        </Form>
      </Section>
      <Section>
        <DataList {...dataListProps} />
      </Section>
    </article>
  );
}

AddString.propTypes = {
  newString: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChangeNewString: PropTypes.func,
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  newString: makeSelectNewString(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeNewString: evt => dispatch(changeNewString(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addString());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddString);
