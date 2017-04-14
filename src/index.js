import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promise from 'redux-promise';
import reducers from './reducers';
import Routes from './router';
import '../semantic/dist/semantic.css';
import '../style/style.css'

const App = () => {
  const createStoreWithMiddleware = applyMiddleware(
    promise
  )(createStore);

  let store = createStoreWithMiddleware(reducers);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
