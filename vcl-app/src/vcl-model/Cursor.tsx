import {cursorX, cursorY, degrees} from './Engine';
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
    
    return (
        <div className="Cursor" style={CursorStyle}></div>
    )
}