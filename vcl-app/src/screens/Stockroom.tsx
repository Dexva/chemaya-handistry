/*------------
   IMPORTS
------------*/
import React from 'react';
import Glassware from '../components/Glassware';
import { Chemical } from '../vcl-model/Chemical';
import ExperimentGlassware from "../vcl-features/glassware.json";
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import {Mixture} from '../vcl-model/Mixture';
import { Entity as EntityModel } from "../vcl-model/Entity";
import '../styles/style.css';
import { setToScreen } from '../App';

/*
TL;DR: The item generation page.
The Stockroom screen is where the user can gather equipment (e.g., glassware, chemicals)
to be used for the experiment they are doing.
*/
function Stockroom() {

    //----- VARIABLES & STATES -----//
    /* Passes up the updated list of generate glassware to the parent component. */
    const createEntity = (e : any) => {
        // let a = window.structuredClone(newGlassware);
        var copyGlassware : any = new GlasswareModel(
            window.structuredClone(e.name),
            window.structuredClone(e.mediapath),
            window.structuredClone(e.maskpath),
            window.structuredClone(e.maxvolume),
            new Mixture(
                //@ts-ignore
                new Map(
                    createMap(window.structuredClone(e.chemformula),
                              window.structuredClone(e.chemmole))
                ),
                window.structuredClone(e.actvolume)
            ),
            "beaker",
            {
                radius:100,
                center: {
                    x:0,
                    y:50
                }
            },
            window.structuredClone(e.height)
        );
        new EntityModel(copyGlassware);
        console.log(EntityModel.Instances);
    }

    function createMap (formula : string[], moles: number[]) {
        let returnMap = new Map();
        for (let i=0;i<formula.length;i++) {
            let chemical : Chemical | undefined = CHEMICAL_LIST.get(formula[i]);
            if (chemical) {
                chemical.moles = moles[i];
                returnMap.set(chemical.name, chemical);
            }
        }
        return returnMap;
    }

    var buttonCount = 0;
    var availableEntities : any[] = Array.from(ExperimentGlassware, (e) => { //not the cause of problem
        buttonCount += 1;
        return (
            <div className="Stockroom-shelf" style={{"--shelfInd": buttonCount} as React.CSSProperties}>
                <div className = "generator-button" onClick = {() => createEntity(e)}>{e.name}</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
        )
    });

    //---- RETURN -----//
    return (
        <div className='Stockroom'>
            <div onClick={(e) => {setToScreen(1)}} className="stockroomToTabletop screenChangeButton"></div>
            {availableEntities}
            
            {/* <div className="Stockroom-shelf" style={{"--shelfInd": 2} as React.CSSProperties}>
                <div className = "generator-button" onClick = {() => createEntity(glassware1)}>Flask of Water (H2O)</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
            <div className="Stockroom-shelf" style={{"--shelfInd": 3} as React.CSSProperties}>
                <div className = "generator-button" onClick = {() => createEntity(glassware2)}>Flask of Juice (ZeStO)</div>
                <div className="Stockroom-shelf-top"></div>
            </div>
            <div className="Stockroom-shelf" style={{"--shelfInd": 4} as React.CSSProperties}>
                <div className = "generator-button" onClick = {() => createEntity(glassware3)}>Flask of Potion (HeAlTH)</div>
                <div className="Stockroom-shelf-top"></div>
            </div> */}
        </div>
    );
}

export default Stockroom;

{ // ARCHIVED CODE (can be hidden / dropped down):
    // return (
    //         <div className="Stockroom">
    //             <div className="Stockroom-shelf">
    //                 {/* list reagents here */}
    //                     //@ts-ignore
    //                 <div className="equipmentGenerator" onClick = {() => {addEquipment(glassware1)}}>
    //                     GENERATE AN ELEMENT
    //                 </div>
/* shelfInd refers to the index of the shelf it is on. 
   the top shelf is shelf 1, the next shelf is shelf 2, 
   and the bottom shelf is shelf 3. */

// function equipmentGens2() {
//     return (
//         <div className="eqptRow" style={{"--shelfInd": 2} as React.CSSProperties}>
//             {/* list reagents here */}
//             <div className="eqptRow-gen" onClick = {() => console.log("bruh")}>
//                 <Glassware
//                     data={
//                         new GlasswareModel(
//                             "erlenmeyerFlask",
//                             "../resources/img/erlenmeyerFlask.png",
//                             "../resources/img/erlenmeyerFlask-mask.png",
//                             1000,
//                             new Mixture(
//                                 //@ts-ignore
//                                 new Map(
//                                     [["L. water", CHEMICAL_LIST.get("H2O(l)")]]
//                                 ),
//                                 500
//                             ),
//                             "beaker"
//                         )
//                     }
//                 />
//             </div>
//         </div>
//     );
// }

// function Stockroom() {

}