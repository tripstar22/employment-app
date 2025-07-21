// * third party library imports *
import PropTypes from 'prop-types';

// * font imports *
import fontSerifDefault from '../styles/fonts';

// * bootstrap style import *
import 'bootstrap/dist/css/bootstrap.min.css';

// * global style import *
import '../styles/globals.scss';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <div className={fontSerifDefault.className}>
      {/* props spreading required for Next.js to work correctly */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </div>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
