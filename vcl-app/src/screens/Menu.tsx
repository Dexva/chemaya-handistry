/*------------
   IMPORTS
------------*/
import '../styles/style.css';
import { setToScreen } from '../App';

/*
TL;DR: The site's landing page.
The Menu screen acts as the landing screen for the user.
It features the app title and logo.

For future extensions: Add UI to change experiments
*/
function Menu() {
    //----- VARIABLES -----//
    const CurrentExpName: string = "Basic Calorimetry";

    //---- RETURN -----//
    return (
        <div className="MenuScreen">
            <div className="MenuScreen-info">
                <div className="MenuScreen-logo"></div>
                <div className="MenuScreen-box">
                    <h1 className="MenuScreen-box-title">Chemaya</h1>
                    <h2 className="MenuScreen-box-subtitle">chemistry at your fingertips.</h2>
                </div>
            </div>
            <div className="MenuScreen-currentExp">
                <div className="MenuScreen-currentExp-label">Current Experiment:</div>
                <div className="MenuScreen-currentExp-name">{CurrentExpName}</div>
                <div onClick={(e) => {setToScreen(1)}} className="screenChangeButton">Start Experiment</div>
            </div>
        </div>
    );
}

export default Menu;