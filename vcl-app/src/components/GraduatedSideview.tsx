/*------------
   IMPORTS
------------*/
import React, { useState, MouseEvent } from 'react';
import GraduationLineGroup from './GraduationLineGroup';
import '../styles/style.css';

interface GraduatedSideviewProps {
    displayState : boolean;
    graduations : number[];
    fill : number;
    max : number;
}

/* A component for the graduated-volume measurement sidepanel */
function GraduatedSideview(props : GraduatedSideviewProps) {
    return (
        <div className={`GraduatedSideview ${props.displayState ? "state-display" : "state-hidden"}`}>
            {
                Array.from(props.graduations, graduation => {
                    return <GraduationLineGroup graduation={graduation} />
                })
            }
            <div
                className="GraduatedSideview-fill"
                style={{"--vol": `${props.fill}`, "--max": `${props.max}`} as React.CSSProperties}
            />
        </div>
    );
}

export default GraduatedSideview;