import { combineReducers } from 'redux';
import D3Reducer from './components/D3Components/D3Reducers.js';


const appReducer = combineReducers({
  D3Reducer
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
}

export default rootReducer;
