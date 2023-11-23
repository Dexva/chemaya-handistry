/*------------
   IMPORTS
------------*/
import { Mixture } from './Mixture';
import { Equipment } from './Equipment';
import { EntityData, Circle } from './EntityData';
import { randElem } from '../utilities/utility';
import { Entity } from "./Entity";
import { InputData } from "./Engine";
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';

type Point = {
    x: number,
    y: number
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
    private readonly hitcircle: Circle;
    private readonly entityDataType: string = "glassware";
    public containingEntity: Entity | undefined;
    private maskPath: string;
    private height: Number;

    //----- CONSTRUCTOR -----//
    public constructor(name: string,
                       spritePath: string,
                       maskPath: string,
                       maxCap: number, 
                       mixture: Mixture, 
                       transferMethod: string,
                       hitcircle: Circle,
                       height: Number) {
        super(name, spritePath);
        this.maskPath = maskPath;
        this.maxCapacity = maxCap;
        this.mixture = mixture;
        this.transferMethod = transferMethod
        this.hitcircle = hitcircle;
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
    public getHitcircle(): Circle {
        return this.hitcircle;
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
