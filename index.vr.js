import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { AppRegistry } from 'react-vr';

import App from './application/components/App';
import plannerApp from './application/reducers';

let store = createStore(plannerApp);


export default class PlannerVR extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
};

AppRegistry.registerComponent('PlannerVR', () => PlannerVR);
