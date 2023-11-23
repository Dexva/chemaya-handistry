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