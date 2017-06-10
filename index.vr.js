import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { AppRegistry } from 'react-vr';

import Application from './application/components';
import plannerApp from './application/reducers';

let store = createStore(plannerApp);

export default PlannerVR = () => (
    <Provider store={store}>
        <Application />
    </Provider>
);

AppRegistry.registerComponent('PlannerVR', () => PlannerVR);
