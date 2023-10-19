import { Circle } from "./EntityData";
import { Entity } from "./Entity";

export let cursorX: number = 0
export let cursorY: number = 0;
export let degrees: number = 0;
const windowWidth: number = window.innerWidth;
const windowHeight: number = window.innerHeight;
const gestureIsHold: Map<string, boolean> = new Map<string, boolean>();
gestureIsHold.set("Closed_Fist",true);
gestureIsHold.set("Open_Palm",true);
gestureIsHold.set("Pointing_Up",false);
gestureIsHold.set("Thumb_Down",false);
gestureIsHold.set("Thumb_Up",false);
gestureIsHold.set("Victory",false);
gestureIsHold.set("I_Love_You",false);
gestureIsHold.set("None",false);

type Point = {
    x: number,
    y: number
}

function EngineTimestep(rawGestureType: string, rawLandmarks: any[]) { 
    // --------------------   
    // Interpreter --------
    // --------------------
    //      Receive raw gesture, determine binary Hold/Not Hold
    let isHold = gestureIsHold.get(rawGestureType);
    
    //      Receive raw landmarks, determine hand position (pointer) and rotation
    let pointer: Point = {x: windowWidth - rawLandmarks[9].x * windowWidth, y: windowHeight - rawLandmarks[9].y * windowHeight};
    // console.log(pointer);
    cursorX = pointer.x;
    cursorY = pointer.y;
    let node1: Point = {x: windowWidth - rawLandmarks[5].x * windowWidth, y: windowHeight - rawLandmarks[5].y * windowHeight}; //pointer node
    let node2: Point = {x: windowWidth - rawLandmarks[17].x * windowWidth, y: windowHeight - rawLandmarks[17].y * windowHeight}; //pinky node

    // rotation setting
    let nodeDX = node1.x - node2.x;
    let nodeDY = node1.y - node2.y;
    let nodeDistance = dist(node1, node2);
    let initialDegree = Math.asin(nodeDX/nodeDistance);

    if (nodeDX > 0 && nodeDY > 0) degrees = initialDegree; // quadrant 1 -- this is not following cartesian logic, check DX & DY values
    else if (nodeDX < 0 && nodeDY >= 0) degrees = initialDegree; // quadrant 2
    else if (nodeDX < 0 && nodeDY < 0) degrees = Math.PI - initialDegree; // quadrant 3
    else if (nodeDX > 0 && nodeDY < 0) degrees = Math.PI - initialDegree; // quadrant 4
    else degrees = initialDegree;

    // console.log(degrees);

    // console.log(degrees);

    // -----------------
    // Searcher --------
    // -----------------
    //      Look through entity list, and determine intersecting Entities with: 1) The hand position 2) The object with the highest z-index's hitcircle, if it exists
    let intersectingEntityWithHighestZ: Entity | undefined = undefined;
    Entity.Instances.forEach((entity : Entity)=>{
        // If entity is intersecting with pointer
        // console.log(entity.getData().getHitcircle());
        let translatedHitcircle: Circle = {
            radius:entity.getData().getHitcircle().radius,
            center:{
                x:entity.getData().getHitcircle().center.x + entity.getCoordinates().x,
                y:entity.getData().getHitcircle().center.y + entity.getCoordinates().y
            }
        };
        if (pointWithinCircle(pointer, translatedHitcircle)) {
            // And there is a previously existing highestZ entity
            if (intersectingEntityWithHighestZ) {
                // And if entity has higher z than current saved entity
                if (intersectingEntityWithHighestZ.getCoordinates().z < entity.getCoordinates().z) {
                    // Set as new highest Z entity.
                    intersectingEntityWithHighestZ = entity;
                }
            } else {
                // There is no previous highest Z entity to compare with.
                // Set as new highest Z entity.
                intersectingEntityWithHighestZ = entity;
            }
        }
    });
    // if (intersectingEntityWithHighestZ) {
    //     // console.log(intersectingEntityWithHighestZ);
    //     // console.log(isHold);
    // } else {
    //     return;
    // }

    // find entities intersecting with highest z-indexer's bounding circle
    // let intersectingEntityIntersectingWithEntityWithHighestZ: Entity;
    // Entity.Instances.forEach((entity) => {
    //     // If entity's hitcircle intersects with highestZ's hitcircle
    //     if (pointWithinCircle(intersectingEntityWithHighestZ.getData().getHitcircle(), entity.getData().getHitcircle())) {
    //         // And there is a previously existing highestZ entity
    //         if (intersectingEntityIntersectingWithEntityWithHighestZ) {
    //             // And if entity has higher z than current saved entity
    //             if (intersectingEntityIntersectingWithEntityWithHighestZ.getCoordinates().z < entity.getCoordinates().z) {
    //                 // Set as new highest Z entity.
    //                 intersectingEntityIntersectingWithEntityWithHighestZ = entity;
    //             }
    //         } else {
    //             // There is no previous highest Z entity to compare with.
    //             // Set as new highest Z entity.
    //             intersectingEntityIntersectingWithEntityWithHighestZ = entity;
    //         }
    //     }
    // });
    
    // ---------------
    // Stator --------
    // ---------------
    //      Given all the above information, determine the states of all Entities found by the Searcher function

    if (isHold && intersectingEntityWithHighestZ) {
        // console.log(intersectingEntityWithHighestZ);
        //@ts-ignore
        intersectingEntityWithHighestZ.setCoordinates(pointer.x, pointer.y);
    }
}

// Returns if a point is within a given circle. 
function pointWithinCircle(p: Point, c: Circle) {
    return dist(c.center, p) <= c.radius;
}
// Returns if two circles are intersecting. 
function circleIntersectsCircle(a: Circle, b: Circle) {
    return dist(a.center, b.center) < (a.radius + b.radius);
}
// Returns the distance between two Points.
function dist(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(b.x - a.x,2) + Math.pow(b.y - a.y,2));
}

export default EngineTimestep;