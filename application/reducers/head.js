import actionTypes  from '../actions/types';


const rotateHead = (state, {angles: {X, Y, Z}}) => ({
    ...state,
    rot: { X, Y, Z },
});


const reducers = {
    [actionTypes.head.rotate]: rotateHead,
};


export default reduce = (state = { rot: {X: 0, Y: 0, Z: 0}}, action) => {
    const fn = reducers[action.type];
    return fn ? fn(state, action) : state;
}
