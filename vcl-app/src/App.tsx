import React, {useState, useEffect} from 'react';
import './App.css';
import ScreenContainer from './components/ScreenContainer';
import Background from './components/Background';
import { Entity } from './vcl-model/Entity';

Entity.initialize();  

export var setToScreen : Function;
function App() {
  const [screen, setScreen] = useState(0);

  setToScreen = setScreen;

  useEffect(() => {
    document.title = "Chemaya"
  }, []);

  return (
    <div className="App">
      <Background/>
      <ScreenContainer screen={screen}/>
    </div>
  );
}

function clamp(value : number, min : number, max : number) {
  return Math.max(Math.min(value, max), min);
}

export default App;
