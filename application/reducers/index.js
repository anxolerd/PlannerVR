import { combineReducers } from 'redux';

import models from './models';
import appUI from './appui';
import head from './head';

export default combineReducers({
    models,
    appUI,
    head,
})