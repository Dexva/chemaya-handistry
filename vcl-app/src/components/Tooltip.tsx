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
        // console.log("lfgggg");
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

        const displayPhase = (chemicalCount: number, phase: string) => {
            if (chemicalCount > 1) return "Multiple Substances";
            if (phase == "l") return "Liquid";
            else if (phase == "aq") return "Aqeuous Solution";
            else return "Empty";
        }

        const displayMoles = (moles: number) => {
            if (1 <= moles && moles < 100) return <span>{moles.toFixed(3)}</span>;


            let expo_split: string[] = String(moles.toExponential(3)).split("e");
            let a = window.structuredClone(expo_split.at(0));
            let b = window.structuredClone(expo_split.at(1));

            return <span>{a} x 10<sup>{b}</sup></span>;
        }


        var mixtureElements : any[] = Array.from(glassware.getMixture().getChemicals(), (value, key) => { //not the cause of problem
            return <p><b>{value[0] + ": "}</b>{displayMoles(value[1].moles)} mol</p>;
        });
        if (!mixtureElements) {
            //@ts-ignore
            mixtureElements.push(<p></p>);
        }

        //----- RETURN -----//
        return (
            <div className="Tooltip styleGlassBox state-display">
                <h2>{multipleChemicals ? firstChemical.name : "Mixture"}</h2>
                <p className="extraInfo">{displayPhase(glassware.getMixture().getChemicals().size, firstChemical.phase)}</p>
                <p><b>Substance/s:</b></p>
                {mixtureElements}
                <br></br>
                <p><b>{"Temperature: "}</b>{glassware.getMixture().getTemperature().toFixed(2) + " "}<sup>{"o"}</sup>{"C"}</p>
                <p><b>{"Volume: "}</b>{glassware.getMixture().getVolume().toFixed(2) + " mL"}</p>
                <p><i>{"contained in " + glassware.getMaxCap() + "-mL " + glassware.getName().toLowerCase()}</i></p>
            </div>
        );
    }

    console.log("failure NONE");
    return (
        <div className="Tooltip styleGlassBox state-empty"></div>
    )
}

export default Tooltip;