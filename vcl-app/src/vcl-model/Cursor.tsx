import {cursorX, cursorY, degrees, cursorState, isHolding} from './Engine';
import React, {useState} from 'react';

interface CursorData {
    x: number,
    y: number
}

export default function Cursor() {

    const CursorStyle = {
        "--x": cursorX,
        "--y": cursorY,
        "--rotate": degrees
    } as React.CSSProperties;

    let CursorClass = "Cursor " + (isHolding ? "state-hold" : "state-" + cursorState);

    return (
        <div className={CursorClass} style={CursorStyle}></div>
    )
}