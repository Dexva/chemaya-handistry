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
    public static Instances : Entity[] = [];
    //----- FIELDS -----//
    private coordinates: Coordinate;     // [string] File path to equipment's sprite
    private rotation: number;
    private data: EntityData;           // [string] Name associated with equipment instance
    private states: Map<string, boolean>;
    //----- CONSTRUCTOR -----//
    public constructor(data : EntityData,x: number = window.innerWidth / 2 + (randInt(500,-500)) , y: number = 310) {
        this.coordinates = {"x":x, "y":y, "z":Entity.Instances.length};
        this.rotation = 0;
        this.data = data;
        data.setContainingEntity(this);
        this.states = this.initializeStates();

        Entity.Instances.push(this);
    }
    private initializeStates() {
        let states = new Map<string, boolean>();
        states.set("hover",false);
        states.set("held",false);
        states.set("intersecting-invoker",false);
        states.set("intersecting-receiver",false);

        return states;
    }

    //----- METHODS -----//
    public static initialize() {
        new Entity(Glassware.generateDummy());
        new Entity(Glassware.generateDummy());
    }
    public calculateStateClasses(): string {
        let classes = "";
        this.states.forEach((stateValue: boolean, stateName: string) => {
            if (stateValue) {
                classes += `state-${stateName}`;
            }
        });
        return classes;
    }

    //----- GETTERS -----//
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
        return this.states.get("intersecting-receiver") || this.states.get("intersecting-invoker");
    }
    public getCoordinates() {
        return this.coordinates;
    }
    public getRotation(): number {
        return this.rotation;
    }
    //----- SETTERS -----//
    public resetAllStates() {
        this.states.set("hover", false);
        this.states.set("held",false);
        this.states.set("intersecting-invoker",false);
        this.states.set("intersecting-receiver",false);
        this.rotation = 0;
    }
    public setCoordinates(x : number,y : number) {
        this.coordinates.x = x;
        this.coordinates.y = y;
    }
    public setState(stateId: string,state: boolean) {
        this.states.set(stateId,state);
    }
    public setRotation(deg: number) {
        this.rotation = deg;
    }
    public setHold() {
        this.states.set("held",true);
    }
    public setUnhold() {
        this.states.set("held",false);
    }
    // Sets the intersect state of the object based on if it is the invoker or the receiver of the intersect event.
    public setIntersect(isInvoker : boolean) {
        this.states.set(isInvoker ? "intersecting-invoker" : "intersecting-receiver",false);
    }
    public setUnintersect() {
        this.states.set("intersecting-invoker",false);
        this.states.set("intersecting-receiver",false);
    }
}
