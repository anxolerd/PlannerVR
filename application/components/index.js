import { connect } from 'react-redux'

import Application from '../views/Application';
import actionsFactories from '../actions/factories';
import { isFunction } from '../util';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    function walk(o) {
        let result = {};

        for (let key in o) {
            if (!o.hasOwnProperty(key)) continue;
            if (!isFunction(o[key])) result[key] = walk(o[key]);
            else result[key] = (...args) => dispatch(o[key](...args));
        }
        return result;
    }

    return {
        actions: walk(actionsFactories),
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Application);