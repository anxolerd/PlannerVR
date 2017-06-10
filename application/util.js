export const DEGS_IN_RAD = 180 / Math.PI;

export const radToDeg = (rad) => {
    return rad * DEGS_IN_RAD;
};


export const isFunction = (o) => {
    return !!(o && o.constructor && o.call && o.apply);
};