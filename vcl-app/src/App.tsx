import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {


  window.addEventListener(
    "message",
    function (e) {
      console.log(e.origin);
      if (e.origin !== "http://localhost:8080/") {
        console.log("wrong");
        return;
      }
      window.alert(e);
    },
    false
  );
  return (
    <div className="App">
    </div>
  );
}

export default App;
