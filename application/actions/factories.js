import types from './types';

let nextModelId = 0;


const objectActions = {
    create: (type, head) => ({
        type: types.object.create,
        modelType: type,
        modelId: nextModelId++,
        head,
    }),

    select: (modelId, head) => ({
        type: types.object.select,
        modelId, head,
    }),

    unselect: (head) => ({
        type: types.object.unselect,
        head,
    }),

    rotate: (head) => ({
        type: types.object.rotate,
        head,
    }),

    moveFurther: (head) => ({
        type: types.object.moveFurther,
        head,
    }),

    moveCloser: (head) => ({
        type: types.object.moveCloser,
        head,
    }),

    delete: (modelId, head) => ({
        type: types.object.delete,
        modelId, head,
    }),

    focus: (modelId) => ({
        type: types.object.focus,
        modelId,
    }),

    blur: (modelId) => ({
        type: types.object.blur,
        modelId,
    }),
};


const headActions = {
    rotate: (angles) => ({
        type: types.head.rotate,
        angles,
    }),
};


const appUIActions = {
    menu: {
        show: (head) => ({type: types.appUI.menu.show, head}),
        hide: () => ({type: types.appUI.menu.hide}),
    },
};


export default {
    object: objectActions,
    appUI: appUIActions,
    head: headActions,
};