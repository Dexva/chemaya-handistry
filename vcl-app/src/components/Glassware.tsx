/*------------
   IMPORTS
------------*/
import React, {useState} from 'react';
import '../styles/style.css';
import {Glassware as GlasswareModel} from '../vcl-model/Glassware';

interface GlasswareProps {
    initializedFromStockroom? : boolean;
    parentState? : Object;
    data : GlasswareModel;
}

/* 
TL;DR: A component representing a Glassware object. 
    - Has an internal fill state that determines how high/low the vesselContent should be
    - Has an svg mask for the vesselContent so it conforms to the shape of the vessel
*/
function Glassware(props : GlasswareProps) {

    //----- VARIABLES & STATES ----//
    const glasswareStyle = {
        "--tilt": "0", 
        "--fillLevel": props.data.getMixture().getVolume() / props.data.getMaxCap() * 100,
        "--color": props.data.getMixture().calculateColor(),
        "--glasswareHeight": `${props.data.getHeight()}px`
    } as React.CSSProperties;

    //----- RETURN -----//
    return (
        <div className={`Glassware ${props.data.getName().toLowerCase().replace(/\s/g, '')}`} style={glasswareStyle}>
            <div className="glassware-image"></div>
            <div className="glassware-internalFillState"></div>
        </div>
    );
}

export default Glassware;