/*------------
   IMPORTS
------------*/
import { Mixture } from './Mixture';
import { Equipment } from './Equipment';
import { EntityData, Circle } from './EntityData';
import { randElem } from '../utilities/utility';
import { Entity } from "./Entity";
import { InputData } from "./Engine";

type Point = {
    x: number,
    y: number
}
type AngleDistTranslation = {
    angle: number,
    dist: number
}

/*
TL;DR: The basic class representing all Glassware
Will contain Mixtures (which itself consist of Chemicals)
*/
export class Glassware extends Equipment implements EntityData {
    //----- FIELDS -----//
    private maxCapacity: number;        // [number] The maximum capacity of the glassware in milliliters (mL)
    private mixture: Mixture;           // [Mixture] The mixture that the glassware holds
    private transferMethod: string;     // [string] A classification denoting how the mixture is transferred
    private readonly hitcircleTranslation: AngleDistTranslation; // [{dist: number, angle: number}] Stores the angle and distance the hitcircle is away from the center of the entity.
    private readonly hitcircleRadius: number;
    private readonly entityDataType: string = "glassware";
    public containingEntity: Entity | undefined;
    private readonly maskPath: string;
    private height: Number;

    //----- CONSTRUCTOR -----//
    public constructor(name: string,
                       spritePath: string,
                       maskPath: string,
                       maxCap: number, 
                       mixture: Mixture, 
                       transferMethod: string,
                       hitcircleTranslation: AngleDistTranslation,
                       hitcircleRadius: number,
                       height: number) {
        super(name, spritePath);
        this.maskPath = maskPath;
        this.maxCapacity = maxCap;
        this.mixture = mixture;
        this.transferMethod = transferMethod
        this.hitcircleTranslation = hitcircleTranslation;
        this.hitcircleRadius = hitcircleRadius;
        this.height = height;
    }
    
    //----- ENTITYTYPE METHODS -----//
    public getTooltipType() {
        return "Glassware";
    }
    public setContainingEntity(entity: Entity) {
        this.containingEntity = entity;
    }
    public getContainingEntity(): Entity | undefined {
        return this.containingEntity;
    }
    public onIntersectReceiver() {} 
    public onIntersectInvoker() {}
    public onHover() {}
    public onHold(inputs: InputData) {
        if (this.containingEntity) {
            this.containingEntity.setCoordinates(inputs.pointer.x, inputs.pointer.y);
        }
    }
    public getEntityDataType(): string {
        return this.entityDataType;
    }
    public getHitcircleRadius(): number {
        return this.hitcircleRadius;
    }
    public getHitcircleCenter(center: Point,degree: number): Point {
        return angleTranslate(center,this.hitcircleTranslation.angle + degree,this.hitcircleTranslation.dist)
    }

    //----- METHODS -----//
    public transfer(receiver: Glassware, volume: number) {
        if (this.transferMethod == 'beaker') {
            let initialVolume = this.mixture.getVolume();

        }
    }
    //----- GETTERS -----//
    public getMaskPath() { return this.maskPath; }
    public getMaxCap() { return this.maxCapacity; }
    public getMixture() { return this.mixture; }
    public getTransferMethod() { return this.transferMethod; }
    public getHeight() { return this.height; }
}

// Given a point, translates that point by the given dist along an angle with a given angle from the x-axis.
function angleTranslate(point: Point,angle: number,dist: number) {
    return {
        x:point.x + dist * Math.cos(degToRad(angle)),
        y:point.y + dist * Math.sin(degToRad(angle))
    };
}
function degToRad(deg: number) {
    return 3.1415/180 * deg;
}