import React from 'react';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import plannerApp from './reducers';
import { AppRegistry } from 'react-vr';


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
