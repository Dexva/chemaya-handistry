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


    //----- CONSTRUCTOR -----//
    public constructor(name: string,
                       spritePath: string,
                       maskPath: string, // currently not being used
                       maxCap: number, 
                       mixture: Mixture, 
                       transferMethod: string,
                       hitcircle: Circle) {
        super(name, spritePath);
        this.maxCapacity = maxCap;
        this.mixture = mixture;
        this.transferMethod = transferMethod
        this.hitcircle = hitcircle;
    }
    
    //----- ENTITYTYPE METHODS -----//
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
        console.log(this.containingEntity);
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
    public transfer() {
        if (this.transferMethod == 'beaker') {}
    }
    public static generateDummy(type: string = randElem(["water","zesto","potion"])) {
        const types = {
            "water":[["L. water", CHEMICAL_LIST.get("H2O(l)")]],
            "zesto":[["L. Zesto Tetrapak", CHEMICAL_LIST.get("ZeSTo(l)")]],
            "potion":[["L. Potion", CHEMICAL_LIST.get("HeAlTh(l)")]]
        }

        return new Glassware(
            "erlenmeyerFlask",
            "../resources/img/erlenmeyerFlask.png",
            "../resources/img/erlenmeyerFlask-mask.png",
            1000,
            new Mixture(
                new Map(
                    //@ts-ignore
                    types[type]
                ),
                Math.floor((500 + (Math.random() * 500) - 250) / 10) * 10
            ),
            "beaker",
            {
                radius:200,
                center: {
                    x:0,
                    y:50
                }
            }
        )
    }

    //----- GETTERS -----//
    public getMaxCap() { return this.maxCapacity; }
    public getMixture() { return this.mixture; }
    public getTransferMethod() { return this.transferMethod; }
}
