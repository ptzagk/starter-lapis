/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import ClientTemplate from './ClientTemplate';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './redux/create';
// import Reactotron from 'reactotron-react-js'
import io from 'socket.io-client';
import Redbox from 'redbox-react';

const consoleErrorReporter = ({ error }) => {
  console.error(error);
  return <Redbox error={error} />;
};

consoleErrorReporter.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired
};

const dest = document.getElementById('content');
const store = createStore(window.reduxState);

// Remove redbox 
delete AppContainer.prototype.unstable_handleError; // FIXME;

ReactDOM.render(
  <AppContainer>
    <ClientTemplate store={store}/>
  </AppContainer>,
  dest
);

if (module && module.hot) {
  module.hot.accept('./ClientTemplate', () => {
    const NextApp = require('./ClientTemplate.js');
    ReactDOM.render(
      <AppContainer errorReporter={consoleErrorReporter}>
        <NextApp store={store} />
      </AppContainer>,
      dest
    );
  });
}


if (process.env.NODE_ENV !== 'production') {

  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
  }
}
