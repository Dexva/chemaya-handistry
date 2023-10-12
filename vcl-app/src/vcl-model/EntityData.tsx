/*------------
   IMPORTS
------------*/

export interface Circle {
    radius: number,
    center: {
        x: number,
        y: number
    }
}

// All Entities require a data field that denotes the details of that entity (ie. that it is Glassware or Equipment or such)
// Since all entities are rendered on screen and have a 
export interface EntityData {
    getHitcircle: Function;
    getEntityDataType: Function;
    onIntersectReceiver: Function;
    onIntersectInvoker: Function;
    onHover: Function;
    onHold: Function;
}