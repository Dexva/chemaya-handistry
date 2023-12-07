/*------------
   IMPORTS
------------*/
import { Glassware } from './Glassware';
import { Equipment } from './Equipment';
import { randInt } from '../utilities/utility';
import { EntityData } from './EntityData';


interface Coordinate {
    x : number;
    y : number;
    z : number;
}

/*
    Represents a physical object on the Tabletop, ie. a Glassware, an Equipment 
*/
export class Entity {
    private static defaultInertiaFrames : number = 20;
    public static Instances : Entity[] = [];
    //----- FIELDS -----//
    public id: number;
    private coordinates: Coordinate;     // [string] File path to equipment's sprite
    private rotation: number;
    private data: EntityData;           // [string] Name associated with equipment instance
    private states: Map<string, number>;
    //----- CONSTRUCTOR -----//
    public constructor(data : EntityData,x: number = randInt(100,window.innerWidth - 100) , y: number = 300) {
        this.coordinates = {"x":x, "y":y, "z":Entity.Instances.length};
        this.rotation = 0;
        this.data = data;
        data.setContainingEntity(this);
        this.states = this.initializeStates();
        this.id = Entity.Instances.length;
        Entity.Instances.push(this);
    }
    private initializeStates() {
        console.log("test");
        let states = new Map<string, number>();
        states.set("hover",0);
        states.set("held",0);
        states.set("transfer-invoker",0);
        states.set("transfer-receiver",0);
        return states;
    }

    //----- METHODS -----//
    public calculateStateClasses(): string {
        let classes = "";
        this.states.forEach((_: number, stateName: string) => {
            if (this.isInState(stateName)) {
                classes += ` state-${stateName} `;
            }
        });
        console.log(classes);
        return classes;
    }
    public isInState(stateName : string) {
        //@ts-ignore
        return this.states.get(stateName) > 0;
    }

    //----- GETTERS -----//
    public static clearInstances() {
        Entity.Instances = [];
    }
    public static allInstances() {
        return Entity.Instances;
    }
    public static getEntity(index : number) {
        return Entity.Instances[index];
    }
    public getData() {
        return this.data;
    }
    public isState(stateId: string) {
        return this.states.get(stateId);
    }
    public isIntersecting() {
        return this.states.get("transfer-receiver") || this.states.get("transfer-invoker");
    }
    public getCoordinates() {
        return this.coordinates;
    }
    public getRotation(): number {
        return this.rotation;
    }
    //----- SETTERS -----//
    public resetAllStates() {
        //@ts-ignore
        this.states.set("hover", Math.max(this.states.get("hover") - 1, -1));
        //@ts-ignore
        this.states.set("held", Math.max(this.states.get("held") - 1, -1));
        //@ts-ignore
        this.states.set("transfer-invoker", Math.max(this.states.get("transfer-invoker") - 1, -1));
        //@ts-ignore
        this.states.set("transfer-receiver", Math.max(this.states.get("transfer-receiver") - 1, -1));
        this.rotation = 0;
    }
    public setCoordinates(x : number,y : number) {
        this.coordinates.x = x;
        this.coordinates.y = y;
    }
    public setState(stateId: string,state: boolean) {
        this.states.set(stateId,state ? Entity.defaultInertiaFrames : 0);
    }
    public setRotation(deg: number) {
        this.rotation = deg;
    }
    public setHold() {
        this.setState("held",true);
    }
    public setUnhold() {
        this.setState("held",false);
    }
    // Sets the intersect state of the object based on if it is the invoker or the receiver of the intersect event.
    public setIntersect(isInvoker : boolean) {
        this.setState(isInvoker ? "transfer-invoker" : "transfer-receiver",false);
    }
    public setUnintersect() {
        this.setState("transfer-invoker",false);
        this.setState("transfer-receiver",false);
    }
    public setZ(z: number) {
        this.coordinates.z = z;
    }
}
