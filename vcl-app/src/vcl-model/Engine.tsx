import { Circle } from "./EntityData";
import { Entity } from "./Entity";
import { Mixture } from "./Mixture";
import GraduatedSideview from "../components/GraduatedSideview";
// var fs = require('fs');

export let cursorState : "none" | "hold" | "hover" | "pour" = "none"; 
export let tooltipEntity : Entity | null = null; // Entity to display the tooltip of.
export let graduatedDisplayEntity : Entity | null = null; // Entity whose volume is displayed
var benchmarkTime : any[] = [];
export let cursorX: number = 0
export let cursorY: number = 0;
export let degrees: number = 0;
export let gesture: string = "None";
export let isHolding: boolean | undefined = false;
const windowWidth: number = window.innerWidth;
const windowHeight: number = window.innerHeight;
const gestureIsHold: Map<string, boolean> = new Map<string, boolean>();
const jueves_gestureMap = {
    "claw": false,
    "fist": true,
    "holding": false,
    "four_hand": false,
    "three_hand": false,
    "ok_hand": false,
    "open_palm": false,
    "oui_oui": true,
    "point_up": false,
    "thumbs_up": false,
    "two_hand": false,
    "spiderman": false,
    "": false
}

for (const [key, value] of Object.entries(jueves_gestureMap)) {
    gestureIsHold.set(key,value);
}

let highestZ = 0;
type Point = {
    x: number,
    y: number
}
export type InputData = {
    isHold: boolean | undefined,
    isPouring: boolean,
    pointer: Point,
    degrees: number,
    invokerEntity: Entity | undefined,
    receiverEntity: Entity | undefined
}

export function EngineTimestep(rawGestureType: string, rawLandmarks: any[]) { 
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
    // let nodeDistance = dist(node1, node2);
    let nodeDistance = dist(node1, node2);
    let initialDegree = Math.asin(nodeDX/nodeDistance);

    if (nodeDX >= 0 && nodeDY > 0) degrees = initialDegree; // quadrant 1 -- this is not following cartesian logic, check DX & DY values
    else if (nodeDX < 0 && nodeDY > 0) degrees = initialDegree; // quadrant 2
    else if (nodeDX < 0 && nodeDY <= 0) degrees = Math.PI - initialDegree; // quadrant 3
    else if (nodeDX > 0 && nodeDY < 0) degrees = Math.PI - initialDegree; // quadrant 4

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
            invokerEntity = entity;
        }
    });
    let receiverEntity: Entity | undefined = undefined;
    if (invokerEntity) {
        let translatedInvokerHitcircle: Circle = {
            //@ts-ignore
            radius: invokerEntity.getData().getHitcircle().radius,
            center:{
                //@ts-ignore
                x: invokerEntity.getData().getHitcircle().center.x + invokerEntity.getCoordinates().x,
                //@ts-ignore
                y: invokerEntity.getData().getHitcircle().center.y + invokerEntity.getCoordinates().y
            }
        };
        Entity.Instances.forEach((entity : Entity)=>{
            if (entity !== invokerEntity) {
                // RESET EVERY STATE
                entity.resetAllStates();

                let translatedHitcircle: Circle = {
                    radius: entity.getData().getHitcircle().radius,
                    center:{
                        x: entity.getData().getHitcircle().center.x + entity.getCoordinates().x,
                        y: entity.getData().getHitcircle().center.y + entity.getCoordinates().y
                    }
                };
                
                // If entity is intersecting with pointer
                // console.log(entity.getData().getHitcircle());
                if (circleIntersectsCircle(translatedInvokerHitcircle, translatedHitcircle)) {
                    console.log("found intersecting circles", invokerEntity?.id, entity.id);
                    // And there is a previously existing highestZ entity
                    if (receiverEntity) {
                        // And if entity has higher z than current saved entity
                        if (receiverEntity.getCoordinates().z < entity.getCoordinates().z) {
                            // Set as new highest Z entity.
                            receiverEntity = entity;
                        }
                    } else {
                        // There is no previous highest Z entity to compare with.
                        // Set as new highest Z entity.
                        receiverEntity = entity;
                    }
                }
            }
        });    
    }
    // console.log(receiverEntity);
    
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
   
    // COLLATE ALL INFORMATION INTO AN INPUTS OBJECT
    // Since the responsibility of updating the state of an Entity is under the entity itself
    // the entity must have all the data calculated by the engine that may be needed
    // to update it's state.
    // This includes the gesture type, pointer, degrees, invoker entity, and receiver entity. 
    let inputs: InputData = {
        isHold:isHold,
        isPouring:(Math.abs(degrees) >= 1.4),
        pointer:pointer,
        degrees:degrees,
        invokerEntity:invokerEntity,
        receiverEntity:receiverEntity
    }

    const floorHeight = 200;

    // Now that all entities have proper states, update everything accordingly
    Entity.Instances.forEach((entity)=>{
        let coords = entity.getCoordinates();
        if (coords.y > floorHeight) {
            entity.setCoordinates(coords.x,coords.y - 0.2);
        } else if (coords.y <= floorHeight) {
            entity.setCoordinates(coords.x,floorHeight);
        }

        if (entity.isInState("hover")) {
            entity.getData().onHover();
        }
        if (entity.isInState("held")) {
            // console.log("being held!!!!");
            entity.getData().onHold(inputs);
        }
    });
    if (typeof invokerEntity == "undefined") {
        tooltipEntity = null;
        graduatedDisplayEntity = null;
        return;
    }
    // Update the calculated rotation of the entity.
    ///@ts-ignore

    // UPDATE INVOKER STATE!
    // Some states cannot coexist with one another, such as intersectionInvoker and intersectionReceiver
    // In such a situation, one state will take priority, overwriting the other.

    cursorState = "none";
    // STATE: ---- hover ----, not exclusive
    if (invokerEntity) {
        cursorState = "hover";
        //@ts-ignore
        console.log("My ID is: " + invokerEntity.id);
        //@ts-ignore
        invokerEntity.setState("hover",true);
        tooltipEntity = invokerEntity;
        graduatedDisplayEntity = invokerEntity;
    }

    // STATE: ---- held ----, exclusive
    if (isHold && invokerEntity) {
        cursorState = "hold";
        //@ts-ignore
        invokerEntity.setZ(++highestZ);
        //@ts-ignore
        invokerEntity.setRotation(degrees);
        //@ts-ignore
        invokerEntity.setState("held",true);
    }

    // STATE: ---- pour ----, exclusive
    if (isHold && invokerEntity && inputs.isPouring) {
        cursorState = "pour";
        // console.log("we pouring!!");
        //@ts-ignore
        invokerEntity.setState("transfer-invoker");

        //@ts-ignore
        let initialVolume = invokerEntity.getData().getMixture().getVolume();
        
        if (initialVolume > Mixture.POUR_RATE) {
            //@ts-ignore
            let movedChemicals = invokerEntity.getData().getMixture().partitionChemicals(Mixture.POUR_RATE / initialVolume);
            //@ts-ignore
            invokerEntity.getData().getMixture().changeVolume(-1 * Mixture.POUR_RATE);
            
            if (receiverEntity) {
                //@ts-ignore
                console.log("invokerEntity: " + invokerEntity.id, "receiverEntity: " + receiverEntity.id);
                //@ts-ignore
                receiverEntity.setState("transfer-receiver");
                //@ts-ignore
                receiverEntity.getData().getMixture().changeVolume(Mixture.POUR_RATE);
                //@ts-ignore
                receiverEntity.getData().getMixture().addListOfChemicals(movedChemicals);
            }
        }
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

    // if (invokerEntity) {console.log(Entity.Instances)};
}

// Returns if a point is within a given circle. 
function pointWithinCircle(p: Point, c: Circle) {
    return dist(c.center, p) <= c.radius;
}
// Returns if two circles are intersecting. 
function circleIntersectsCircle(a: Circle, b: Circle) {
    // console.log(a.center,b.center,dist(a.center, b.center));
    return dist(a.center, b.center) < (a.radius + b.radius);
}
// Returns the distance between two Points.
function dist(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(b.x - a.x,2) + Math.pow(b.y - a.y,2));
}