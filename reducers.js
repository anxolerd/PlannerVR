import { combineReducers } from 'redux';
import { asset } from 'react-vr';

const DEG_IN_RAD = 57.2958;

const model = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_OBJ': {
            switch (action.model) {
                case 'CHAIR': {
                    return {
                        id: action.id,
                        source: { obj: asset('dchair_obj.obj') },
                        layoutOrigin: [0.5, 0.5],
                        transform: {
                            baseRot: action.rot,
                            objRotY: 0,
                            scale: 0.05,
                            distance: -3,
                        }
                    }
                }
                default: {
                    throw `Unsupported model type: ${action.model}`;
                }
            }
        }
        case 'HEAD_ROTATE': {
            if (state.id !== action.id) return state;
            return {
                ...state,
                transform: {
                    ...state.transform,
                    baseRot: {
                        X: action.rot.X * DEG_IN_RAD,
                        Y: action.rot.Y * DEG_IN_RAD,
                        Z: action.rot.Z * DEG_IN_RAD,
                    },
                }
            }
        }
        case 'OBJ_ROTATE': {
            if (state.id !== action.id) return state;
            const currentAngle = state.transform.objRotY;
            const degrees = action.direction === 'CW' ? -3 : 3;
            return {
                ...state,
                transform: {
                    ...state.transform,
                    objRotY: currentAngle + degrees,
                }
            }
        }
        case 'MOVE': {
            if (state.id !== action.id) return state;
            const currentDistance = state.transform.distance;
            const distance = action.direction === 'FROM' ? 1 : -1;
            return {
                ...state,
                transform: {
                    ...state.transform,
                    distance: currentDistance + distance,
                }
            }
        }
        default: { return state; }
    }
};

const plannerApp = (state = {models: [], currentModelId: -1}, action) => {
    switch (action.type) {
        case 'ADD_OBJ': {
            const newObj = model(undefined, action);
            return {
                models: [
                    ...state.models,
                    newObj,
                ],
                currentModelId: newObj.id,
            }
        }
        case 'SELECT': {
            return {
                models: state.models,
                currentModelId: action.id,
            }
        }
        default: {
            return {
                models: state.models.map((m) => model(m, action)),
                currentModelId: state.currentModelId,
            }
        }
    }
};


export default combineReducers({plannerApp});