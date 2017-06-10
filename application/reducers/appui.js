import actionTypes from '../actions/types';

export default (state = {isMenuOpen: false, menuHead: { rot: {X: 0, Y: 0, Z: 0}}}, action) => {
    switch (action.type) {
        case actionTypes.appUI.menu.show:
            return { isMenuOpen: true, menuHead: action.head };
        case actionTypes.appUI.menu.hide:
            return { isMenuOpen: false, menuHead: state.menuHead };
    }
    return state;
};