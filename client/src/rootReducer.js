import { combineReducers } from 'redux';
import C3Reducer from './components/C3Components/C3Reducers.js';


const appReducer = combineReducers({
  C3Reducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
