import React, {useState, useEffect} from 'react';
import './App.css';
import ScreenContainer from './components/ScreenContainer';
import Background from './components/Background';
import { Entity } from './vcl-model/Entity';

var hasNotChangedScreenInTheLast500Milliseconds : boolean = true;

Entity.initialize();  

function App() {
  const [screen, setScreen] = useState(0);
  console.log(screen);

  useEffect(() => {
    document.title = "Chemaya"
  }, []);

  return (
    <div className="App">
      <Background/>
      <ScreenContainer screen={screen}/>
      <div className="ToPreviousScreen flex-centered" onMouseOver={(e) => {
          attemptToSetScreen(clamp(screen - 1, 0, 2),setScreen)}
      }></div>
      <div className="ToNextScreen flex-centered" onMouseOver={(e) => {
          attemptToSetScreen(clamp(screen + 1, 0, 2),setScreen)}
      }></div>
    </div>
  );
}

function clamp(value : number, min : number, max : number) {
  return Math.max(Math.min(value, max), min);
}
function attemptToSetScreen(newScreen : number, setScreen : Function) {
  if (hasNotChangedScreenInTheLast500Milliseconds) {
    // console.log("newScreen",newScreen);
    setScreen(newScreen);
    hasNotChangedScreenInTheLast500Milliseconds = false;
    setTimeout(() => {
      hasNotChangedScreenInTheLast500Milliseconds = true;
    },500);
  }
}

export default App;
