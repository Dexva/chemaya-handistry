/*------------
   IMPORTS
------------*/
import React from 'react';
import { Chemical } from '../vcl-model/Chemical';
import ExperimentGlassware from "../vcl-features/glassware.json";
import CHEMICAL_LIST from '../vcl-features/LoadChemicals';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';
import {Mixture} from '../vcl-model/Mixture';
import { Entity as EntityModel } from "../vcl-model/Entity";
import '../styles/style.css';
import { setToScreen } from '../App';
import Glassware from '../components/Glassware';
import Entity from '../components/Entity';

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
            window.structuredClone(e.readable),
            new Mixture(
                //@ts-ignore
                new Map(
                    createMap(window.structuredClone(e.chemformula),
                              window.structuredClone(e.chemmole))
                ),
                window.structuredClone(e.actvolume),
                25  //in celsius
            ),
            "beaker",
            window.structuredClone(e.hitcircle.translation),
            window.structuredClone(e.hitcircle.radius),
            window.structuredClone(e.height),
            window.structuredClone(e.radius)
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
                returnMap.set(chemical.formula, chemical);
            }
        }
        return returnMap;
    }

    var shelfInd = 0;
    var availableEntities : any[] = Array.from(ExperimentGlassware, (row) => { //not the cause of problem
        shelfInd += 1;

        let glasswares = Array.from(row,(e)=>{
            let color: any = CHEMICAL_LIST.get(e.chemformula[0]);
            if (color) color = `rgba(${color.color.r},${color.color.g},${color.color.b},${color.color.a})`;
    
            //----- VARIABLES & STATES ----//
            const glasswareStyle = {
                "--tilt": "0", 
                "--glasswareHeight": `${e.height * 0.7}px`,
                "--fillLevel": color ? Math.max(e.actvolume / e.maxvolume * 100,50) : 0,
                "--color": color ? color : "",
            } as React.CSSProperties;
            return <div className="stockroomSpriteContainer">
                <div onClick = {() => createEntity(e)} style={glasswareStyle} className={`stockroomStaticSprite Glassware ${e.name.toLowerCase().replace(/\s/g, '')}`}>
                    <div className="glassware-image"></div>
                    <div className="glassware-internalFillState"></div>
                </div>
                <div className="stockroomSpriteLabel">
                    <div className="stockroomSpriteLabel-title">{e.chemformula}</div>
                    <div className="stockroomSpriteLabel-equipment">{`${e.maxvolume}ml ${e.name}`}</div>
                </div>
            </div>
        })
        
        

        return (
            <div className="Stockroom-shelf" style={{"--shelfInd": shelfInd} as React.CSSProperties}>
                {glasswares}
                <div className="slab">
                    <div className="slab-top"></div>
                    <div className="slab-top-border"></div>
                </div>
            </div>
        )
    });

    //---- RETURN -----//
    return (
        <div className='Stockroom'>
            <div onClick={(e) => {setToScreen(1)}} className="stockroomToTabletop screenChangeButton"></div>
            <div className="stockroomSupportGraphic stockroomSupportGraphic-leftFront"></div>
            <div className="stockroomSupportGraphic stockroomSupportGraphic-rightFront"></div>
            <div className="stockroomSupportGraphic stockroomSupportGraphic-leftMiddle"></div>
            <div className="stockroomSupportGraphic stockroomSupportGraphic-rightMiddle"></div>
            <div className="stockroomSupportGraphic stockroomSupportGraphic-leftBack"></div>
            <div className="stockroomSupportGraphic stockroomSupportGraphic-rightBack"></div>
            {availableEntities}
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