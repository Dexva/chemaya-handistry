/*------------
   IMPORTS
------------*/
import React from 'react';
import Screen from './Screen';
import MainMenu from '../screens/Menu';
import Tabletop from '../screens/Tabletop';
import Stockroom from '../screens/Stockroom';
import '../styles/style.css';

interface ScreenContainerProps {
    screen : number
}

/*
TL;DR: The sliding component containing all the screens
ScreenContainer [300 vw] is a parent container for 3 Screen objects [100vw each]: Menu, Tabletop, and Stockroom.
It has two side "buttons" that has hoverEvent to navigate through these 3 Screen objects
*/
function ScreenContainer(props : ScreenContainerProps) {

    //----- VARIABLES & STATES -----//
    const ScreenContainerStyle = {"--screen": props.screen} as React.CSSProperties;
    
    //----- RETURN -----//
    return (
        <div className="ScreenContainer" style={ScreenContainerStyle}>
            <Screen index={0}>
                <MainMenu/>
            </Screen>
            <Screen index={1}>
                <Tabletop/>
            </Screen>
            <Screen index={2}>
                <Stockroom/>
            </Screen>
            <div className="slab tabletopGraphic">
                <div className="slab-top"></div>
                <div className="slab-top-border"></div>
                <div className="slab-bottom"></div>
            </div>
        </div>
    );
}

export default ScreenContainer;
