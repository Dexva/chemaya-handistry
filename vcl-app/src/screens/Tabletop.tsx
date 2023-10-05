/*------------
   IMPORTS
------------*/
import React from 'react';
import Glassware from '../components/Glassware';
import { Entity as EntityModel } from "../vcl-model/Entity";
import Entity from '../components/Entity';
import EntityContainer from '../components/EntityContainer';
import '../styles/style.css';

/* Given 2 rectangular hitboxes, check if the 2 overlaps */
function checkIntersection(rect1 : any, rect2 : any) {
    //https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
    // return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
    const midpoint1 = {
        x:(rect1.left + rect1.right) / 2,
        y:(rect1.top + rect1.bottom) / 2
    }
    const midpoint2 = {
        x:(rect2.left + rect2.right) / 2,
        y:(rect2.top + rect2.bottom) / 2
    }
    // distance of rects in pixels
    const dist = Math.sqrt(Math.pow(midpoint2.x - midpoint1.x, 2) + Math.pow(midpoint2.y - midpoint1.y,2));
    return dist < 100;
}

/*
TL;DR: The main working area.
The Tabletop screen is where the user can perform the experiment.
Here, the user may drag-and-drop glassware and make them interact with one another.

To-do: Integrate virtual cursor and NUI.
*/
function Tabletop() {
    //----- VARIABLES & STATES -----//

    //----- FUNCTIONS -----//
    
    //----- COMPONENT OF RETURN -----//
    var entityElements : any[] = Array.from(EntityModel.allInstances(), (entityData, index) => { //not the cause of problem
        var equipment : any = entityData.getData();
        return <Entity entityIndex={index}>
            <Glassware data={equipment}/>
        </Entity>
    });

    //----- RETURN -----//
    return (
        <div className="Tabletop">
            <div  
                className = "debug-button" 
                onClick = {() => {console.log(EntityModel.allInstances())}}>
                Log All Entities
            </div>
            <EntityContainer> 
                {entityElements}
            </EntityContainer>
        </div>
    );
}

export default Tabletop;