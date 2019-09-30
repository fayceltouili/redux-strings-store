import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

function DataList({ loading, error, data }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }
  if (data) {
    if (data.length > 0) {
      return <List items={data} />;
    } else {
      const missingData = () => (
        <ListItem item="No data available to display, please add some strings!" />
      );
      return <List component={missingData} />;
    }
  }
  return null;
}

DataList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  data: PropTypes.any,
};

export default DataList;
