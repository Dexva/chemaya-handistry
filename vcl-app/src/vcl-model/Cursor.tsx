import {cursorX, cursorY, degrees, gesture, isHolding} from './Engine';
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

    let CursorClass = "Cursor " + (gesture == "None" ? "state-none" : "")  + (isHolding ? "state-holding" : "");

    return (
        <div className={CursorClass} style={CursorStyle}></div>
    )
}