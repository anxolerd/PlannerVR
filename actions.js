let nextModelId = 0;

export const addModel = (headRot) => ({
    type: 'ADD_OBJ',
    model: 'CHAIR',
    rot: headRot,
    id: nextModelId++,
});

export const rotateHead = (headRot, id) => ({
    id,
    type: 'HEAD_ROTATE',
    rot: headRot,
});

export const rotateObj = (direction, id) => ({
    id,
    direction,
    type: 'OBJ_ROTATE',
});

export const move = (direction, id) => ({
    id,
    direction,
    type: 'MOVE',
});

export const select = (id) => ({
    id,
    type: 'SELECT',
});