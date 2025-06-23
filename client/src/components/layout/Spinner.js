import React, { Fragment } from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => {
  return (
    <Fragment>
      <div className="d-flex justify-content-center py-5">
        <BootstrapSpinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">加载中...</span>
        </BootstrapSpinner>
      </div>
    </Fragment>
  );
};

export default Spinner; 