/*------------
   IMPORTS
------------*/
import React from 'react';
import '../styles/style.css';

interface EntityContainerProps {
    children: React.ReactNode;
}

/*
The parent component for Entities to be generated on the Tabletop screen
*/
function EntityContainer(props : EntityContainerProps) {

    //----- RETURN -----//
    return (
        <div className="EntityContainer">
            {props.children}
        </div>
    );
}

export default EntityContainer;