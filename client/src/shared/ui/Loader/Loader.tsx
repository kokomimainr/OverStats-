import React from 'react';

type LoaderProps = {
}

const Loader = ({}: LoaderProps): JSX.Element => {
  return (
    <div className="text-center mt-50">
  <div className="spinner-border" role="status">
  </div>
  <span className="sr-only"> Loading...</span>
</div>
  );
};

export default Loader;
