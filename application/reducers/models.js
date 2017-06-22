import { asset } from 'react-vr';

import { types as actions }  from '../actions';


const modelDefinitions = {
    CHAIR: {
        source: { 
            obj: asset('collection/chair/plastic_chair.obj'),
            mtl: asset('collection/chair/plastic_chair.mtl'),
        },
        rotationY: 0,
        scale: 0.02,
        distance: -5,
    },
    BED: {
        source: {
            obj: asset('collection/bed/bed1.obj'),
            mtl: asset('collection/bed/bed1.mtl'),
        },
        rotationY: 0,
        scale: 1.0,
        distance: -4,
    },
    BED_TABLE: {
        source: {
            obj: asset('collection/bed-table/bed-table.obj'),
            mtl: asset('collection/bed-table/bed-table.mtl'),
        },
        rotationY: 0,
        scale: 0.05,
        distance: -6,
    },
    SOFA: {
        source: {
            obj: asset('collection/sofa/Leather_sofa.obj'),
            mtl: asset('collection/sofa/Leather_sofa.mtl'),
        },
        rotationY: 0,
        scale: 1,
        distance: -4,
    }
};


const newModel = ({ head, modelType, modelId }) => {
    const defaultParams = modelDefinitions[modelType];
    if (!defaultParams) throw `Unsupported model type: ${modelType}`;

    return {
        ...defaultParams,
        id: modelId,
        headRot: head.rot,
    }
};


const applyHeadRotation = (model, head) => {
    return {
        ...model,
        headRot: head.rot,
    }
};


const moveModel = (model, distance) => {
    const newDistance = model.distance + distance;
    return {
        ...model,
        distance: newDistance <= 0 ? newDistance : 0,
    }
};


const rotateModel = (model, angle) => {
    return {
        ...model,
        rotationY: model.rotationY + angle,
    }
};


export default reduce = (
    state = { models: [], currentModelId: null, focusedModelId: null },
    action
) => {
    switch (action.type) {
        case actions.object.create:
            return {
                models: [...state.models, newModel(action)],
                currentModelId: action.modelId,
                focusedModelId: state.focusedModelId,
            };
        case actions.object.delete:
            return {
                models: state.models.filter((m) => m.id !== action.modelId),
                currentModelId: (
                    state.currentModelId !== action.modelId
                    ? state.currentModelId
                    : null
                ),
                focusedModelId: (
                    state.focusedModelId !== action.modelId
                    ? state.focusedModelId
                    :null
                )
            };
        case actions.object.select:
            return {
                models: state.models,
                currentModelId: action.modelId,
                focusedModelId: state.focusedModelId,
            };
        case actions.object.unselect:
            return {
                models: state.models.map((m) => (
                    m.id === state.currentModelId
                    ? applyHeadRotation(m, action.head)
                    : m
                )),
                currentModelId: null,
                focusedModelId: state.focusedModelId,
            };
        case actions.object.moveCloser:
            return {
                models: state.models.map((m) => (
                    m.id === state.currentModelId
                    ? moveModel(m, 1)
                    : m
                )),
                currentModelId: state.currentModelId,
                focusedModelId: state.focusedModelId,
            };
        case actions.object.moveFurther:
            return {
                models: state.models.map((m) => (
                    m.id === state.currentModelId
                    ? moveModel(m, -1)
                    : m
                )),
                currentModelId: state.currentModelId,
                focusedModelId: state.focusedModelId,
            };
        case actions.object.rotate:
            return {
                models: state.models.map((m) => (
                   m.id === state.currentModelId
                   ? rotateModel(m, 3)
                   : m
                )),
                currentModelId: state.currentModelId,
                focusedModelId: state.focusedModelId,
            };
        case actions.object.focus:
            return {
                models: state.models,
                currentModelId: state.currentModelId,
                focusedModelId: action.modelId,
            };
        case actions.object.blur:
            return {
                models: state.models,
                currentModelId: state.currentModelId,
                focusedModelId: (
                    state.focusedModelId === action.modelId
                    ? null
                    : state.focusedModelId
                ),
            }
    }
    return state;
};
