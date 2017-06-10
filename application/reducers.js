import { combineReducers } from 'redux';
import { asset } from 'react-vr';

import { ACTION_TYPES } from './actions';

const DEG_IN_RAD = 57.2958;

const model = (state = {}, action) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_OBJECT: {
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
        case ACTION_TYPES.ROTATE_HEAD: {
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
        case ACTION_TYPES.ROTATE_OBJECT: {
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
        case ACTION_TYPES.MOVE_OBJECT: {
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
        case ACTION_TYPES.ADD_OBJECT: {
            const newObj = model(undefined, action);
            return {
                models: [
                    ...state.models,
                    newObj,
                ],
                currentModelId: newObj.id,
            }
        }
        case ACTION_TYPES.DELETE_OBJECT: {
            return {
                models: state.models.filter((m) => m.id !== action.id),
                currentModelId: (
                    state.currentModelId === action.id
                    ? -1
                    : state.currentModelId
                ),
            }
        }
        case ACTION_TYPES.SELECT_OBJECT: {
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