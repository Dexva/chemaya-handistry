/*------------
   IMPORTS
------------*/
import { Mixture } from './Mixture';
import { Equipment } from './Equipment';
import { randElem } from '../utilities/utility';
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';

/*
TL;DR: The basic class representing all Glassware
Will contain Mixtures (which itself consist of Chemicals)
*/
export class Glassware extends Equipment{
    //----- FIELDS -----//
    private maxCapacity: number;        // [number] The maximum capacity of the glassware in milliliters (mL)
    private mixture: Mixture;           // [Mixture] The mixture that the glassware holds
    private transferMethod: string;     // [string] A classification denoting how the mixture is transferred

    //----- CONSTRUCTOR -----//
    public constructor(name: string,
                       spritePath: string,
                       maskPath: string, // currently not being used
                       maxCap: number, 
                       mixture: Mixture, 
                       transferMethod: string) {
        super(name, spritePath);
        this.maxCapacity = maxCap;
        this.mixture = mixture;
        this.transferMethod = transferMethod
    }
    
    //----- METHODS -----//
    public transfer() { // add or call transfer methods here
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
            "beaker"
        )
    }

    //----- GETTERS -----//
    public getMaxCap() { return this.maxCapacity; }
    public getMixture() { return this.mixture; }
    public getTransferMethod() { return this.transferMethod; }
}
