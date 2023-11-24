/*------------
   IMPORTS
------------*/
import React from 'react';
import '../styles/style.css';

interface DebugDotProps {
    x: Number;
    y: Number;
    color: String;
}

type debugDotData = {
    x: Number;
    y: Number;
    color: String;
}
export var debugDotDatas : debugDotData[] = [];

export function addDebugDot(x: Number,y: Number,color: String = "red") {
    debugDotDatas.push({
        x:x,
        y:y,
        color:color
    } as debugDotData);
}

/*
The parent component for Entities to be generated on the Tabletop screen
*/
function DebugDot(props : DebugDotProps) {

    const dotStyle = {
        "--x": props.x, 
        "--y": props.y,
        "--color": props.color ? props.color : "red"
    } as React.CSSProperties;

    //----- RETURN -----//
    return (
        <div className="DebugDot" style={dotStyle}></div>
    );
}

export default DebugDot;