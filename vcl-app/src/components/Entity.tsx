/*------------
   IMPORTS
------------*/
import React, { useState } from "react";
import { Entity as EntityModel } from "../vcl-model/Entity";

interface EntityProps {
    children : React.ReactNode;
    entityIndex : number;
}

/*
TL;DR: A parent container that makes nested components interactive (i.e., draggable).
- Dragging occurs when mouse is held and moved.
- Dragging stops when mouse is released.
*/
function Entity(props : EntityProps) {
    let entity = EntityModel.getEntity(props.entityIndex);

    const InteractiveStyle = {
        "--x": entity.getCoordinates().x,
        "--y": entity.getCoordinates().y,
        "--z": props.entityIndex,
        "--r": entity.getRotation()
    } as React.CSSProperties;

    var entityClasses: string = entity.calculateStateClasses();

    return (
        <div 
            className={ "entity " + entityClasses } 
            data-entityindex={props.entityIndex} 
            style={InteractiveStyle}
        >
            {props.children}
        </div>
    );
}

export default Entity;