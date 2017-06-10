let nextModelId = 0;

export const ACTION_TYPES = {
    ADD_OBJECT: 'ao',
    ROTATE_HEAD: 'rh',
    ROTATE_OBJECT: 'ro',
    MOVE_OBJECT: 'mo',
    SELECT_OBJECT: 'so',
    DELETE_OBJECT: 'do',
};


export const addModel = (headRot) => ({
    type: ACTION_TYPES.ADD_OBJECT,
    model: 'CHAIR',
    rot: headRot,
    id: nextModelId++,
});

export const rotateHead = (headRot, id) => ({
    id,
    type: ACTION_TYPES.ROTATE_HEAD,
    rot: headRot,
});

export const rotateObj = (direction, id) => ({
    id,
    direction,
    type: ACTION_TYPES.ROTATE_OBJECT,
});

export const move = (direction, id) => ({
    id,
    direction,
    type: ACTION_TYPES.MOVE_OBJECT,
});

export const select = (id) => ({
    id,
    type: ACTION_TYPES.SELECT_OBJECT,
});

export const deleteObject = (id) => ({
    id,
    type: ACTION_TYPES.DELETE_OBJECT,
})