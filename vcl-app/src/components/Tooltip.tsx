/*------------
   IMPORTS
------------*/
import '../styles/style.css';
import { Entity } from '../vcl-model/Entity';
import { Glassware } from '../vcl-model/Glassware';

interface TooltipProps {
    entity : Entity | null
}

/* 
TL;DR: The tooltip that appears on the top-right of the screen when you hover over an Equipment component.
Present relevant information about Equipment.
Ex: Glassware's Mixture's name, volume, physical state, etc.
*/ 
function Tooltip(props : TooltipProps) {

    if (props.entity == null) {
        return (
            <div className="Tooltip styleGlassBox state-empty"></div>
        )
    }

    let tooltipType = props.entity.getData().getTooltipType();
    if (tooltipType == "Glassware") {
        console.log("lfgggg");
        let glassware = props.entity.getData() as Glassware;
        //----- VARIABLES & STATES -----//
        const iterator = glassware.getMixture().getChemicals().entries();
        let firstChemical;
        if (glassware.getMixture().getChemicals().size > 0) firstChemical = iterator.next().value[1];
        else firstChemical = "none";
        
        var multipleChemicals = false;
        try {
            const secondChemical = iterator.next().value[1];
        } catch {
            multipleChemicals = true;
        }

        //----- RETURN -----//
        return (
            <div className="Tooltip styleGlassBox state-display">
                <h2>{multipleChemicals ? firstChemical.name : "L. mixture"}</h2>
                <p className="extraInfo">{(firstChemical.phase == "l" ? "🌢Liquid" : "🌢Aqueous Solution") +
                    ", " +
                    (firstChemical.formula)}</p>
                <p>{Math.round(glassware.getMixture().getVolume()) + "mL within " + glassware.getName()}</p>
            </div>
        );
    }

    console.log("failure NONE");
    return (
        <div className="Tooltip styleGlassBox state-empty"></div>
    )
}

export default Tooltip;