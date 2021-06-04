import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

// Middleware - a func that receive action in and then do smth with it and then pass it to the root reducer
// logger - helps debug redux code

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
