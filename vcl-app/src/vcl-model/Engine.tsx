import { Circle } from "./EntityData";
import { Entity } from "./Entity";
// var fs = require('fs');

var benchmarkTime : any[] = [];
export let cursorX: number = 0
export let cursorY: number = 0;
export let degrees: number = 0;
export let gesture: string = "None";
export let isHolding: boolean | undefined = false;
const windowWidth: number = window.innerWidth;
const windowHeight: number = window.innerHeight;
const gestureIsHold: Map<string, boolean> = new Map<string, boolean>();
gestureIsHold.set("Closed_Fist",true);
gestureIsHold.set("Open_Palm",false);
gestureIsHold.set("Pointing_Up",false);
gestureIsHold.set("Thumb_Down",false);
gestureIsHold.set("Thumb_Up",false);
gestureIsHold.set("Victory",false);
gestureIsHold.set("I_Love_You",false);
gestureIsHold.set("None",false);

let highestZ = 0;
type Point = {
    x: number,
    y: number
}
export type InputData = {
    isHold: boolean | undefined,
    pointer: Point,
    degrees: number,
    invokerEntity: Entity,
    receiverEntity: Entity | undefined
}

function EngineTimestep(rawGestureType: string, rawLandmarks: any[], sendTime: number, receiveTime: number) { 
    gesture = rawGestureType;
    // --------------------   
    // Interpreter --------
    // --------------------
    //      Receive raw gesture, determine binary Hold/Not Hold
    let isHold: boolean | undefined = gestureIsHold.get(rawGestureType);
    isHolding = isHold;
    
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
    let invokerEntity: Entity | undefined = undefined;
    Entity.Instances.forEach((entity : Entity)=>{
        // RESET EVERY STATE
        entity.resetAllStates();
        
        // If entity is intersecting with pointer
        // console.log(entity.getData().getHitcircle());
        let translatedHitcircle: Circle = {
            radius: entity.getData().getHitcircle().radius,
            center:{
                x: entity.getData().getHitcircle().center.x + entity.getCoordinates().x,
                y: entity.getData().getHitcircle().center.y + entity.getCoordinates().y
            }
        };
        if (pointWithinCircle(pointer, translatedHitcircle)) {
            // And there is a previously existing highestZ entity
            if (invokerEntity) {
                // And if entity has higher z than current saved entity
                if (invokerEntity.getCoordinates().z < entity.getCoordinates().z) {
                    // Set as new highest Z entity.
                    invokerEntity = entity;
                }
            } else {
                // There is no previous highest Z entity to compare with.
                // Set as new highest Z entity.
                invokerEntity = entity;
            }
        }
    });
    if (typeof invokerEntity == "undefined") {
        return;
    }
    // if (invokerEntity) {
    //     // console.log(invokerEntity);
    //     // console.log(isHold);
    // } else {
    //     return;
    // }

    // find entities intersecting with highest z-indexer's bounding circle
    // let targetEntity: Entity;
    // Entity.Instances.forEach((entity) => {
    //     // If entity's hitcircle intersects with highestZ's hitcircle
    //     if (pointWithinCircle(invokerEntity.getData().getHitcircle(), entity.getData().getHitcircle())) {
    //         // And there is a previously existing highestZ entity
    //         if (targetEntity) {
    //             // And if entity has higher z than current saved entity
    //             if (invokerEntity.getCoordinates().z < entity.getCoordinates().z) {
    //                 // Set as new highest Z entity.
    //                 targetEntity = entity;
    //             }
    //         } else {
    //             // There is no previous highest Z entity to compare with.
    //             // Set as new highest Z entity.
    //             targetEntity = entity;
    //         }
    //     }
    // });
    
    // ---------------
    // Stator --------
    // ---------------
    //      Given all the above information, determine the states of all Entities found by the Searcher function

    // Update the calculated rotation of the entity.
    ///@ts-ignore
    invokerEntity.setRotation(degrees);
   
    // COLLATE ALL INFORMATION INTO AN INPUTS OBJECT
    // Since the responsibility of updating the state of an Entity is under the entity itself
    // the entity must have all the data calculated by the engine that may be needed
    // to update it's state.
    // This includes the gesture type, pointer, degrees, invoker entity, and receiver entity. 
    let inputs: InputData = {
        isHold:isHold,
        pointer:pointer,
        degrees:degrees,
        invokerEntity:invokerEntity,
        receiverEntity:undefined
    }

    // UPDATE STATES!
    // Some states cannot coexist with one another, such as intersectionInvoker and intersectionReceiver
    // In such a situation, one state will take priority, overwriting the other.

    // STATE: ---- hover ----, not exclusive
    if (invokerEntity) {
        //@ts-ignore
        invokerEntity.setState("hover",true);
        //@ts-ignore
        invokerEntity.getData().onHover(inputs);
    }

    // STATE: ---- held ----, exclusive
    if (isHold && invokerEntity) {
        //@ts-ignore
        invokerEntity.setZ(++highestZ);
        //@ts-ignore
        invokerEntity.setState("held",true);
        //@ts-ignore
        invokerEntity.getData().onHold(inputs);
    }

    // STATE: ---- intersecting-invoker ----, exclusive
    if (isHold && invokerEntity) {
        //@ts-ignore
        invokerEntity.setState("intersecting-invoker",true);
        //@ts-ignore
        invokerEntity.getData().onIntersectInvoker(inputs);
    }

    // STATE: ---- intersecting-receiver ----, exclusive
    // else if (isHold && receiverEntity) {
    ////@ts-ignore
    //     invokerEntity.setState("intersecting-receiver",true);
    ////@ts-ignore
    //     invokerEntity.getData().onIntersectReceiver(inputs);
    // }

    // TIME BENCHMARKING
    // let engineTime = Date.now();
    // let timeData = {
    //     'socketLatency': receiveTime - sendTime,
    //     'engineLatency': engineTime - receiveTime,
    //     'totalLatency': engineTime - sendTime
    // };
    // benchmarkTime.push(timeData);
    // if (benchmarkTime.length > 10) {
    //     console.log("got benchmarkingTime");
    //     let bt = JSON.stringify(benchmarkTime);
    //     fs.writeFile("benchmarking_data.json", bt, {}, () => {});
    //     throw {};
    // }
    // console.log(timeData);
    // console.clear();
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